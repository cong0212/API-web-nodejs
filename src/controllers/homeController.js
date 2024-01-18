
const db = require('../models/index.js');
const CRUDservice = require('../services/CRUDservice.js');

const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

};

const getAboutPage = (req, res) => {
    return res.render('about.ejs');
};

const getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

const postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(req.body)
    console.log(message)
    return res.send('ok')
}

const getAllCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        data: data
    })
}

const getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInforById(userId)
        console.log(userData)
        return res.render('editCRUD.ejs', {
            data: userData
        })
    } else {
        return res.send('user not found')
    }

}

const putEditCRUD = async (req, res) => {
    let data = req.body
    await CRUDservice.updateUser(data)
    res.redirect('/get-CRUD')
}

module.exports = {
    getAboutPage, getHomePage, getCRUD, postCRUD, getAllCRUD, getEditCRUD
    ,putEditCRUD
}