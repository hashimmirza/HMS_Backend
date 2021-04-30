const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let create = async (req, res, next) => {
    let {
        email,
        password
    } = req.body;
    try {
        let user = await db.User.create({
            email: email,
            password: password,
        });
        return responseModule.successResponse(res, {
            success: true,
            message: 'You are successfully registered.',
            user: user
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

let admin_login = async (req, res, next) => {
    let {
        username,
        password,
        type
    } = req.body;
    try {
        let admin = await db.Admin.findOne({where : {
            email: email,
            type : type}});
        if(admin === null){
            return responseModule.failResponse(res, {
                success: false,
                message: 'Invalid email !'
            });
        }else{
            if(admin.password === password) {


                return responseModule.successResponse(res, {
                    success: true,
                    message: 'Login Successfully !',
                    hospital : admin
                });
            }else{
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Invalid Password !'
                });
            }
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err.toString()
        });
    }
};

module.exports = {
    create,
    admin_login
};
