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

let getDoctorsByDepartment = async (req, res, next) => {
    console.log("hash");
    let {hospital_id , department_id} = req.params;
    try {
        let doctors = await db.Hospital_doctor_department.findAll({
            where: {
                hospital_id: hospital_id,
                department_id : department_id
            },
            include: [
                {
                    model: db.Doctor,
                },
            ],
        });
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
    getAllDoctors,
    getDoctorsByDepartment
};
