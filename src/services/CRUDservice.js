const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db = require('../models/index.js');

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFronBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFronBcrypt,
                firstName: data.firtname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleID: data.roleid,
            })

            resolve('create new user succeed')
        } catch (e) {
            reject(e)
        }
    })

}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

const getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let findUser = await db.User.findOne({
                where: { id: userId }
            })
            if (findUser) {
                resolve(findUser)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (data) => {
    return new Promise (async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if (user) {
                user.firstName = data.firtname;
                user.lastName = data.lastname;
                user.address = data.address;
                user.phonenumber = data.phonenumber;

                await user.save();
                resolve();
            }else {
                resolve();
            }
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
    createNewUser, getAllUser, getUserInforById,updateUser
}