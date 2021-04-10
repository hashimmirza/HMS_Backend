const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let addEmergencyLog = async (req, res, next) => {
    let {hospital_id } = req.params;
    let {
        doctor_id,
        nurse_id,
        representor_name,
        patient_name,
        cnic,
        age,
        phone_number ,
        gender ,
        condition ,
        description
    } = req.body;
    try {
        let alreadyExistUser = await db.User.findOne({where : {cnic: cnic,}});
        let user ;
        if(alreadyExistUser === null){
            user = await db.User.create({
                name: representor_name,
                gender: gender,
                age : age ,
                cnic : cnic,
                phone_number : phone_number,
                user_type : "patient_representator"
            });
        }else{
            user = alreadyExistUser ;
        }
        let userId = JSON.parse(JSON.stringify(user));
        let emergencyLogs = await db.Emergency_logs.create({
            description: description,
            condition : condition,
            patient_representator_id : userId.id,
            user_id : userId.id,
            hospital_id : hospital_id ,
            doctor_id : doctor_id ,
            patient_name : patient_name ,
            nurse_id : nurse_id
        });
        return responseModule.successResponse(res, {
            success: true,
            emergencyLog: emergencyLogs
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {addEmergencyLog};
