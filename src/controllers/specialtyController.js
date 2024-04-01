const doctorService = require('../services/specialtyService')

let createSpecialty = async (req, res) => {
    try {
        let response = await doctorService.handleCreateSpecialty(req.body);
        return res.status(200).json({
            response
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleGetTopSpecialty = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.handleGetTopSpecialty(+limit);
        return res.status(200).json({
            response
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleGetDetailSpecialtyById = async (req, res) => {
    try {
        let response = await doctorService.handleGetSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json({
            response
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


module.exports = {
    createSpecialty, handleGetTopSpecialty, handleGetDetailSpecialtyById
}