const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getUserbyCNIC = async (req, res, next) => {
    let {
        cnic
    } = req.body;
    try {
        let user = await db.User.findOne({where : {cnic: cnic,}});
        if(user === null){
            return responseModule.failResponse(res, {
                success: false,
                message: 'No User Found',
            });
        }else{

            return responseModule.successResponse(res, {
                success: true,
                message: 'User Found',
                user: user
            });
        }

    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    getUserbyCNIC
};
