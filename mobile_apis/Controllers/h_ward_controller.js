const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getAllWards = async (req, res, next) => {
    let {hospital_id} = req.params;
    try {
        let wards = await db.Ward.findAll({
            where: {
                hospital_id: hospital_id,
            }});

        return responseModule.successResponse(res, {
            success: true,
            nurses: wards
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let addWard = async (req, res, next) => {
    let {
        name,
        description,
        floor_id
    } = req.body;
    let {hospital_id } = req.params ;
    try {

        let ward = await db.Ward.create({
            name: name,
            description : description,
            floor_id  : floor_id,
            hospital_id : hospital_id
        });
        return responseModule.successResponse(res, {
            success: true,
            message: 'Ward successfully added.',
            room : ward
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let deleteWard = async (req, res, next) => {
    let {hospital_id , ward_id} = req.params;

    try {
        let ward = await db.Ward.findOne({where: {id: ward_id}});
        if(ward !== null){

            let deleteWard = await db.Ward.destroy({
                where: { id: ward_id }
            });

            return responseModule.successResponse(res, {
                success: true,
                message: "Successfully Deleted !"
            });

        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: "invalid ward Id"
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let updateWard = async (req, res, next) => {
    let {
        name,
        description,
        floor_id,
    } = req.body;
    let {ward_id} = req.params ;
    try {

        let ward = await db.Ward.update({
            name: name,
            description : description,
            floor_id :floor_id
        },{where : {
                id : ward_id
            }});
        return responseModule.successResponse(res, {
            success: true,
            message: 'ward successfully registered.',
            ward : ward,
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    addWard,
    getAllWards,
    deleteWard,
    updateWard
};
