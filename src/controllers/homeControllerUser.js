const { name } = require('ejs');
const userService = require('../services/userService')

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }

    let userData = await userService.handleUserLogin(email, password)


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    let users = await userService.getAllUsers(id)

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    console.log(message);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let message = await userService.editUser(req.body)
    return res.status(200).json(message)
}

let handleSearchUsers = async (req, res) => {
    let nameUser = req.body.name;
    if (!nameUser) {
        res.status(500).json({
            errCode: 3,
            errMessage: 'Missing required parameter'
        })
    }
    let users = await userService.searchUsers(nameUser)
    return res.status(200).json({
        users
    })
}

let handleGetAllCodes = async (req, res) => {
    try{
        let data = await userService.getAllCodes(req.query.type)
        return res.status(200).json(data)
    }catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server' 
        })
    }
}



module.exports = {
    handleLogin, handleGetAllUsers, handleCreateNewUser,
    handleDeleteUser, handleEditUser, handleSearchUsers,handleGetAllCodes
}