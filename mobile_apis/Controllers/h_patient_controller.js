const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let addOutDoorPatient = async (req, res, next) => {
    let {
        name,
        age,
        gender,
        condition,
        disease_description,
        phone_number,
        cnic,
        doctor_id
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
                user_type : "patient"
            });
        }else{
            user = alreadyExistUser ;
        }

        let patient = await db.Patient.create({
            name: name,
            user_id: user.id,
            description : disease_description
        });
        let medicalHistory = await db.Medical_history.create({
            disease: disease_description,
            condition : condition,
            type : "outdoor",
            patient_id : patient.id,
            hospital_id : hospital_id ,
            doctor_id : doctor_id
        });

        return responseModule.successResponse(res, {
            success: true,
            message: 'Patient successfully registered.',
            patient : patient,
            medicalHistory : medicalHistory,
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
    addOutDoorPatient
};
