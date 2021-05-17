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

let addDepartment = async (req, res, next) => {
    let {hospital_id} = req.params;
    let {name, description} = req.body
    try {
        let department = await db.Department.create({
            name: name,
            description : description,
            hospital_id : hospital_id
        });
        return responseModule.successResponse(res, {
            success: true,
            message : "Added Successfully !",
            department: department
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let updateDepartment = async (req, res, next) => {
    let {hospital_id , department_id} = req.params;
    let {name, description} = req.body
    try {

        let department = await db.Department.update({
            name: name,
            description : description,
        },{where : {
                id : department_id
            }});

        return responseModule.successResponse(res, {
            success: true,
            message : "Updated Successfully !",
            department: department
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    getDepartments,
    addDepartment,
    updateDepartment
};
