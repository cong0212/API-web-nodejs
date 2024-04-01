const db = require('../models/index.js')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { Op } = require('sequelize');

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleID', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'not User'
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system.pleas try other email`
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            console.log(users)
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used'
                })
            } else {
                let hashPasswordFronBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFronBcrypt,
                    firstName: data.firtname,
                    lastName: data.lastname,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleID: data.roleid,
                    positionID: data.position,
                    image: data.avatar
                })

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

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errmessage: 'The user is not exits'
                })
            }

            // await user.destroy();

            await db.User.destroy({
                where: { id: id }
            })

            resolve({
                errCode: 0,
                message: 'deleted user'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleid || !data.position || !data.gender) {
                resolve({
                    erroCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firtname;
                user.lastName = data.lastname;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.gender = data.gender;
                user.positionID = data.position;
                user.roleID = data.roleid;
                if (data.avatar) {
                    user.image = data.avatar
                }


                await user.save();
                resolve({
                    errCode: 0,
                    message: 'user updated'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'user is not exits'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let searchUsers = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    name: {
                        [Op.like]: `%${name}%` // Sử dụng Op.like để tìm kiếm theo phần của tên
                    }
                },
                raw: false // Lấy dữ liệu dạng JSON thay vì Sequelize instance
            });

            if (users.length > 0) {
                resolve({
                    errCode: 0,
                    users: users,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'No users found',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getAllCodes = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let res = {};
                let allCodes = await db.ALLcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCodes;
                resolve(res)
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin, getAllUsers, createNewUser, deleteUser, editUser,
    searchUsers, getAllCodes
}