const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getAllDoctors = async (req, res, next) => {
    let {hospital_id} = req.params;
    try {
        let doctors = await db.Doctor.findAll({where : {hospital_id: hospital_id}});
        return responseModule.successResponse(res, {
            success: true,
            doctors: doctors
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
module.exports = {
    getAllDoctors
};
