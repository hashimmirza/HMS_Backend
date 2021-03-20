const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let login = async (req, res, next) => {
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

module.exports = {
    login
};
