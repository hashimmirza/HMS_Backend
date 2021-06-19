const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getAllFloors = async (req, res, next) => {
    let {hospital_id, building_id} = req.params;
    try {
        let floors = await db.Floor.findAll({where : {building_id: building_id}});
        return responseModule.successResponse(res, {
            success: true,
            floors: floors
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

let addBuilding = async (req, res, next) => {
    let {hospital_id} = req.params;
    let {name, description} = req.body
    try {
        let building = await db.Building.create({
            name: name,
            description : description,
            hospital_id : hospital_id
        });
        return responseModule.successResponse(res, {
            success: true,
            message : "Added Successfully !",
            building: building
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let updateBuilding = async (req, res, next) => {
    let {hospital_id , building_id} = req.params;
    let {name, description} = req.body
    try {

        let building = await db.Building.findOne({where: {id: building_id,}});
        if(building !== null) {

            let updateBuilding = await db.Building.update({
                name: name,
                description : description,
            },{where : {
                    id : building_id
                }});

            return responseModule.successResponse(res, {
                success: true,
                message : "Updated Successfully !",
                building: updateBuilding
            });
        }else {
            return responseModule.failResponse(res, {
                success: false,
                message: "Invalid building Id"
            });
        }

    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};


let deleteBuilding = async (req, res, next) => {
    let {hospital_id , building_id} = req.params;

    try {
        let building = await db.Building.findOne({where: {id: building_id,}});
        if(building !== null){

            let deleteBuilding = await db.Building.destroy({
                where: { id: building_id }
            });

            return responseModule.successResponse(res, {
                success: true,
                message: "Successfully Deleted !"
            });

        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: "Invalid building Id"
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
    getAllFloors,
    addBuilding,
    updateBuilding,
    deleteBuilding
};
