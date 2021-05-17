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
let deleteDoctor = async (req, res, next) => {
    let {hospital_id , doctor_id} = req.params;

    try {
        let doctor = await db.Doctor.findOne({where: {id: doctor_id,}});
        if(doctor !== null){
            let med_prec = await db.Medical_practitioner.findOne({where: {id: doctor.medical_practitioner_id,}});

            let deleteUser = await db.User.destroy({
                where: { id: med_prec.user_id }
            });
            let deleteMedPrec = await db.Medical_practitioner.destroy({
                where: { id: doctor.medical_practitioner_id }
            });
            let deleteDoc = await db.Doctor.destroy({
                where: { id: doctor_id }
            });
            return responseModule.successResponse(res, {
                success: true,
                message: "Successfully Deleted !"
            });

        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: "invalid doctor Id"
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let addDoctor = async (req, res, next) => {
    let {
        name,
        age,
        gender,
        description,
        phone_number,
        cnic,
        ward_id,
        specialization,
        department_id,
        is_verified
    } = req.body;
    let {hospital_id} = req.params ;
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
                user_type : "doctor"
            });
        }else{
            user = alreadyExistUser ;
        }

        let med_prec = await db.Medical_practitioner.create({
            name: name,
            type: "doctor",
            hospital_id : hospital_id,
            user_id : user.id,
            ward_id : ward_id
        });

        let doctor = await db.Doctor.create({
            name: name,
            description : description,
            specialization : specialization,
            is_verified  : is_verified,
            hospital_id : hospital_id ,
            medical_practitioner_id : med_prec.id,
            department_id : department_id
        });
        return responseModule.successResponse(res, {
            success: true,
            message: 'Doctor successfully registered.',
            doctor : doctor,
            medical_practitioner : med_prec,
            user : user
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let updateDoctor = async (req, res, next) => {
    let {
        name,
        age,
        gender,
        description,
        phone_number,
        cnic,
        ward_id,
        specialization,
        department_id,
        is_verified
    } = req.body;
    let {hospital_id, doctor_id} = req.params ;
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
                user_type : "doctor"
            });
        }else{
            user = alreadyExistUser ;
        }
        let doctor = await db.Doctor.update({
            name: name,
            description : description,
            specialization : specialization,
            is_verified  : is_verified,
            hospital_id : hospital_id ,
            department_id : department_id
        },{where : {
            id : doctor_id
            }});
        return responseModule.successResponse(res, {
            success: true,
            message: 'Doctor successfully updated.',
            doctor : doctor,
            user : user
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
    getDoctorsByDepartment,
    deleteDoctor,
    addDoctor,
    updateDoctor
};
