const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getNurseByDepartment = async (req, res, next) => {
    let {hospital_id , department_id} = req.params;
    try {
        let nurses = await db.Hospital_nurse_department.findAll({
            where: {
                hospital_id: hospital_id,
                department_id : department_id
            },
            include: [
                {
                    model: db.Nurse,
                },
            ],
        });
        return responseModule.successResponse(res, {
            success: true,
            nurses: nurses
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    getNurseByDepartment
};
