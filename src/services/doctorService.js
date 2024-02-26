const db = require('../models/index.js')
const { Op } = require('sequelize');
require('dotenv').config();
const _ = require('lodash');


const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleID: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}


let saveInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.action
                || !data.selectPrice || !data.selectPayment || !data.selectProvince
                || !data.nameClinic || !data.addressClinic || !data.note
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {

                //upsert to markdown
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                } else if (data.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = data.contentHTML;
                        doctorMarkdown.contentMarkdown = data.contentMarkdown;
                        doctorMarkdown.description = data.description;
                        await doctorMarkdown.save()
                    }

                }

                //upsert to infor table

                let doctorInfor = await db.DoctorInfor.findOne({
                    where: {
                        doctorID: data.doctorId
                    },
                    raw: false
                })

                console.log('check doctorinfor: ', doctorInfor)

                if (doctorInfor) {

                    doctorInfor.doctorID = data.doctorId;
                    doctorInfor.priceID = data.selectPrice;
                    doctorInfor.provinceID = data.selectProvince;
                    doctorInfor.paymentID = data.selectPayment;
                    doctorInfor.addressClinic = data.addressClinic;
                    doctorInfor.nameClinic = data.nameClinic;
                    doctorInfor.note = data.note
                    await doctorInfor.save()
                }
                else {
                    await db.DoctorInfor.create({
                        doctorID: data.doctorId,
                        priceID: data.selectPrice,
                        provinceID: data.selectProvince,
                        paymentID: data.selectPayment,
                        nameClinic: data.nameClinic,
                        addressClinic: data.addressClinic,
                        note: data.note,
                    })
                }


                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.ALLcode, as: 'positionData', attributes: ['valueEN', 'valueVI'] },

                        {
                            model: db.DoctorInfor,
                            attributes: {
                                exclude: ['id', 'doctorID']
                            },
                            include: [
                                { model: db.ALLcode, as: 'priceTypeData', attributes: ['valueEN', 'valueVI'] },
                                { model: db.ALLcode, as: 'provinceTypeData', attributes: ['valueEN', 'valueVI'] },
                                { model: db.ALLcode, as: 'paymentTypeData', attributes: ['valueEN', 'valueVI'] }
                            ]

                        }
                    ],
                    raw: false,
                    nest: true,
                })

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let handleBulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorID || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                console.log('check send data: ', schedule);
                console.log('check send data: ', typeof schedule);

                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorID: data.doctorID, date: data.date },
                        attributes: ['timeType', 'date', 'doctorID', 'maxNumber'],
                        raw: true
                    }
                )

                // if (existing && existing.length > 0) {
                //     existing = existing.map(item => {
                //         item.date = new Date(item.date).getTime();
                //         return item;
                //     })
                // }

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }



                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getTopDoctor = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleID: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.ALLcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.ALLcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.ALLcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })

                if (!dataSchedule) dataSchedule = [];

                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}

let handleGetInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.DoctorInfor.findOne({
                    where: { doctorID: doctorId },
                    attributes: {
                        exclude: ['id', 'DoctorID']
                    },
                    include: [
                        { model: db.ALLcode, as: 'priceTypeData', attributes: ['valueEN', 'valueVI'] },
                        { model: db.ALLcode, as: 'provinceTypeData', attributes: ['valueEN', 'valueVI'] },
                        { model: db.ALLcode, as: 'paymentTypeData', attributes: ['valueEN', 'valueVI'] }
                    ],
                    raw: false,
                    nest: true,
                })


                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    getAllDoctor, saveInforDoctor, handleGetDetailDoctorById, handleBulkCreateSchedule,
    getTopDoctor, handleGetScheduleByDate, handleGetInforDoctorById
}