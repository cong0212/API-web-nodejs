const doctorService = require('../services/doctorService')




let handleGetTopDoctors = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctor(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form server...'
        })
    }
}

let handleGetAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctor()
        return res.status(200).json(doctors)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handlePostInforDoctors = async (req, res) => {
    try {
        let response = await doctorService.saveInforDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleGetDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.handleGetDetailDoctorById(req.query.id);
        return res.status(200).json(
            infor
        )

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleBulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.handleBulkCreateSchedule(req.body);
        return res.status(200).json(
            infor
        )

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let response = await doctorService.handleGetScheduleByDate(req.query.doctorId, req.query.date);
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

let getExtranInforDoctorById = async (req, res) => {
    try {
        let response = await doctorService.handleGetInforDoctorById(req.query.doctorId);
        console.log('check id Doctor:', req.query.doctorId)
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
    handleGetAllDoctors, handlePostInforDoctors, handleGetDetailDoctorById,
    handleBulkCreateSchedule, handleGetTopDoctors, getScheduleByDate, getExtranInforDoctorById
}