const doctorService = require('../services/patientService')


let postBookAppoinment = async (req, res) => {
    try {
        let response = await doctorService.handlepostBookAppoinment(req.body);
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

let postVerifyBookAppoinment = async (req, res) => {
    try {
        let response = await doctorService.handlepostVeryfyBookAppoinment(req.body);
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
    postBookAppoinment, postVerifyBookAppoinment
}