const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeControllerUser = require("../controllers/homeControllerUser.js")
const homeControllerDoctor = require("../controllers/doctorController.js")
const homeControllerPatient = require("../controllers/patientController.js")
const homeControllerSpecialty = require("../controllers/specialtyController.js")


const router = express.Router();

const initWebRouters = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/homepage', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getAllCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/edit-CRUD', homeController.putEditCRUD);

    router.post('/api/login', homeControllerUser.handleLogin);
    router.get('/api/get-all-users', homeControllerUser.handleGetAllUsers);
    router.post('/api/create-new-user', homeControllerUser.handleCreateNewUser);
    router.delete('/api/delete-a-user', homeControllerUser.handleDeleteUser);
    router.put('/api/edit-a-user', homeControllerUser.handleEditUser);
    router.get('/api/search-users', homeControllerUser.handleSearchUsers);
    router.get('/api/get-all-codes', homeControllerUser.handleGetAllCodes);

    router.get('/api/get-all-doctors', homeControllerDoctor.handleGetAllDoctors);
    router.get('/api/get-top-doctors', homeControllerDoctor.handleGetTopDoctors);
    router.post('/api/save-infor-doctors', homeControllerDoctor.handlePostInforDoctors);
    router.get('/api/get-detail-doctor-by-id', homeControllerDoctor.handleGetDetailDoctorById);
    router.post('/api/bulk-create-schedule', homeControllerDoctor.handleBulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', homeControllerDoctor.getScheduleByDate);

    router.get('/api/get-schedule-doctor-by-date-specialty', homeControllerDoctor.getAllDoctorBySpecialty);

    router.get('/api/get-extra-infor-doctor-by-id', homeControllerDoctor.getExtranInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', homeControllerDoctor.getProfileDoctorById);

    router.get('/api/get-list-patient-for-doctor', homeControllerDoctor.getListPatientForDoctor);
    router.post('/api/send-remedy', homeControllerDoctor.sendRemedy);


    router.post('/api/patient-book-appoinment', homeControllerPatient.postBookAppoinment)
    router.post('/api/verify-book-appoinment', homeControllerPatient.postVerifyBookAppoinment)

    router.post('/api/create-new-specialty', homeControllerSpecialty.createSpecialty)
    router.get('/api/get-top-specialty', homeControllerSpecialty.handleGetTopSpecialty);
    router.get('/api/get-detail-specialty-by-id', homeControllerSpecialty.handleGetDetailSpecialtyById);




    return app.use("/", router);
}

module.exports = { initWebRouters }
