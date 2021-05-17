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

let getAllNurses = async (req, res, next) => {
    let {hospital_id} = req.params;
    try {
        console.log("hashh")
        let nurses = await db.Nurse.findAll({
            where: {
                hospital_id: hospital_id,
            }
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

let addNurse = async (req, res, next) => {
    let {
        name,
        age,
        gender,
        description,
        phone_number,
        cnic,
        ward_id,
        is_verified
    } = req.body;
    let {hospital_id , nurse_id} = req.params ;
    try {

        let alreadyExistUser = await db.User.findOne({where : {cnic: cnic,}});
        let user
        if(alreadyExistUser === null){
            user = await db.User.create({
                name: name,
                gender: gender,
                age : age ,
                cnic : cnic,
                phone_number : phone_number,
                user_type : "nurse"
            });
        }else{
            user = alreadyExistUser ;
        }

        let med_prec = await db.Medical_practitioner.create({
            name: name,
            type: "nurse",
            hospital_id : hospital_id,
            user_id : user.id,
            ward_id : ward_id
        });

        let nurse = await db.Nurse.create({
            name: name,
            description : description,
            is_verified  : is_verified,
            hospital_id : hospital_id ,
            medical_practitioner_id : med_prec.id
        });
        return responseModule.successResponse(res, {
            success: true,
            message: 'Nurse successfully added.',
            nurse : nurse,
            user : user
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

let deleteNurse = async (req, res, next) => {
    let {hospital_id , nurse_id} = req.params;

    try {
        let nurse = await db.Nurse.findOne({where: {id: nurse_id,}});
        if(nurse !== null){
            let med_prec = await db.Medical_practitioner.findOne({where: {id: nurse.medical_practitioner_id,}});

            let deleteUser = await db.User.destroy({
                where: { id: med_prec.user_id }
            });
            let deleteMedPrec = await db.Medical_practitioner.destroy({
                where: { id: nurse.medical_practitioner_id }
            });
            let deleteDoc = await db.Nurse.destroy({
                where: { id: nurse_id }
            });

            return responseModule.successResponse(res, {
                success: true,
                message: "Successfully Deleted !"
            });


        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: "invalid nurse Id"
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

let updateNurse = async (req, res, next) => {
    console.log("hashda")
    let {
        name,
        description,
        is_verified
    } = req.body;
    let { nurse_id} = req.params ;
    try {
        let nurse = await db.Nurse.update({
            name: name,
            description : description,
            is_verified  : is_verified,
        },{
            where :{
                id : nurse_id
            }
        });
        return responseModule.successResponse(res, {
            success: true,
            message: 'Nurse successfully updated.',
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};


module.exports = {
    getNurseByDepartment,
    getAllNurses,
    addNurse,
    deleteNurse,
    updateNurse
};
