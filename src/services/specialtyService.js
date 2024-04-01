const db = require('../models/index.js');

let handleCreateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'create new specialty success'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetTopSpecialty = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findAll({
                limit: limitInput,
            })

            resolve({
                errCode: 0,
                data: specialty
            })
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                })

                if (data) {
                    let doctorSpecialty = [];
                    if (location === "ALL") {
                        doctorSpecialty = await db.DoctorInfor.findAll({
                            where: {
                                SpecialtyID: id,
                            },
                            attributes: ['doctorID', 'provinceID'],
                        })
                    } else {
                        doctorSpecialty = await db.DoctorInfor.findAll({
                            where: {
                                SpecialtyID: id,
                                provinceID: location
                            },
                            attributes: ['doctorID', 'provinceID']
                        })   
                    }

                    data.doctorSpecialty = doctorSpecialty;
                }

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleCreateSpecialty, handleGetTopSpecialty, handleGetSpecialtyById
}