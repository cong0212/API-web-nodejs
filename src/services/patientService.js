const db = require('../models/index.js')
const { Op } = require('sequelize');
require('dotenv').config();
const _ = require('lodash');
const emailService = require('./emailService.js');
const { v4: uuidv4 } = require('uuid');




let buildUrlEmail = (doctorID, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorID=${doctorID}`
    return result;
}



let handlepostBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorID || !data.timeType || !data.date
                || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })

                console.log('check data booking: ', data)
            } else {
                let token = uuidv4();

                await emailService.sendEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    redirectLink: buildUrlEmail(data.doctorID, token)
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleID: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    }
                })

                console.log('check user: ', user)

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientID: user[0].id,
                            statusID: { [Op.or]: ['S1', 'S2'] }
                        },
                        defaults: {
                            statusID: 'S1',
                            doctorID: data.doctorID,
                            patientID: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient success'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handlepostVeryfyBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorID) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorID: data.doctorID,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusID = 'S2';
                    await appointment.save();


                    resolve({
                        errCode: 0,
                        errMessage: 'Comfirm Successd !'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'fail'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handlepostBookAppoinment, handlepostVeryfyBookAppoinment
}