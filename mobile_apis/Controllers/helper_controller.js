const db = require('../../config/sequelize').db;

const responseModule = require('../../config/response');

let verify_api_key = async (req, res, next) => {
    try {
        if (req.headers.api_key != undefined) {
            let foundData = await db.User.findOne({
                where: {
                    api_key: req.headers.api_key
                }
            });
            if (foundData != null) {
                req.user = foundData;
                return next();
            } else {
                if(req.headers.api_key === process.env.MASTER_KEY){
                    return next();
                }else{
                    return responseModule.failResponse(res, {
                        success: false,
                        message: 'Invalid Api key ! '
                    });
                }
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: "Please provide API Key !"
            });
        }
    } catch (err) {
        console.log(req.headers.api_key)
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let restrict_master_key = async (req, res , next) => {
    try {
                if(req.headers.api_key === process.env.MASTER_KEY){
                    return responseModule.failResponse(res, {
                        success: false,
                        message: 'Unable to get information without login !'
                    });
                }else{
                    return next();
                }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
module.exports = {
    verify_api_key,
    restrict_master_key
};
