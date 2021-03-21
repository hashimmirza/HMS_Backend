const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');
let verify_hospital_token = async (req, res, next) => {
    try {
        let {access_token} = req.headers ;
        let {hospital_id} = req.params ;
        let hospital = await db.Hospital.findOne({where : {id: hospital_id,}});
        if(hospital !== null){
            if (hospital.access_token === access_token) {
                    return next();
            } else {
                return responseModule.failResponse(res, {
                    success: false,
                    message: "Invalid access token !"
                });
            }
        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: "Invalid Hospital Id !"
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

module.exports = {
    verify_hospital_token,
};
