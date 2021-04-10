const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getDepartments = async (req, res, next) => {
    let {hospital_id} = req.params;
    try {
        let departments = await db.Department.findAll({where : {hospital_id: hospital_id}});
        return responseModule.successResponse(res, {
            success: true,
            departments: departments
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    getDepartments
};
