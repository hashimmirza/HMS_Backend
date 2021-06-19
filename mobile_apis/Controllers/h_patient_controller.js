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
let addIndoorPatient = async (req, res, next) => {
    let {
        name,
        age,
        gender,
        condition,
        disease_description,
        phone_number,
        cnic,
        doctor_id,
        ward_id,
        room_id
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
            type : "indoor",
            patient_id : patient.id,
            hospital_id : hospital_id ,
            doctor_id : doctor_id
        });
        let indoorPatient = await db.Indoor_patient.create({
            disease: disease_description,
            condition : condition,
            type : "indoor",
            patient_id : patient.id,
            hospital_id : hospital_id ,
            ward_id : ward_id,
            room_id : room_id,
            history_id : medicalHistory.id
        });
        return responseModule.successResponse(res, {
            success: true,
            message: 'Patient successfully registered.',
            indoorPatient :indoorPatient,
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
let getAllPatients = async (req, res, next) => {
    let {hospital_id} = req.params ;
    try {

        let inOutPatients = await db.Medical_history.findAll({where : {hospital_id: hospital_id},
            include: [
                {
                    model: db.Patient,
                },
                {
                    model: db.Doctor,
                },
            ],});
        let emergencyPatients = await db.Emergency_logs.findAll({
            where : {
                hospital_id: hospital_id
            },
            include: [
                {
                    model: db.User,
                },
                {
                    model: db.Doctor,
                },
                {
                    model: db.Nurse,
                },
            ],});
        return responseModule.successResponse(res, {
            success: true,
            inOutPatients : inOutPatients,
            emergencyPatients : emergencyPatients

        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let examinPatientAssistantDoc = async (req, res, next) => {
    let {
        doctor_id,
        medical_history_id,
        blood_pressure,
        sugar_test,
        weight,
        current_medicines,
        tests_conducted,
        blood_reports,
        tag,
        sleep,
        eyesight,
        questions_answers,
    } = req.body ;
    let {hospital_id} = req.params ;
    try {

        await db.Assistant_Doc_Patient.create({
            doctor_id :doctor_id,
            patient_id : medical_history_id,
            blood_pressure : blood_pressure,
            sugar_test :sugar_test,
            weight :weight,
            current_medicines : current_medicines,
            tests_conducted : tests_conducted,
            blood_reports : blood_reports,
            tag :tag,
            sleep : sleep,
            eyesight :eyesight,
            questions_answers : questions_answers ,
            hospital_id :hospital_id
        });

        await db.Medical_history.update({
            checked_by: "assistant_doctor",
        },{where : {
                id : medical_history_id
            }});

        return responseModule.successResponse(res, {
            success: true,
            message: 'added successfully',
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let getPatientsForDoctor = async (req, res, next) => {
    let {hospital_id , doctor_id} = req.params ;
    try {

        let patients = await db.Assistant_Doc_Patient.findAll({where :
                {
                    hospital_id: hospital_id,
                    doctor_id : doctor_id,
                    status : null
                },
            include: [
                {
                    model: db.Patient,
                },
                {
                    model: db.Doctor,
                },
            ],});
        return responseModule.successResponse(res, {
            success: true,
            patients : patients,


        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let examinPatientByDoc = async (req, res, next) => {
    let {
        assistant_doc_patient_id,
        eprescription,
        recommendation,
        required,
        stay_away,
        start_eating,
        visit
    } = req.body ;
    let {hospital_id} = req.params ;
    try {

        await db.Doc_Patient.create({
            assistant_doc_patient_id :assistant_doc_patient_id,
            eprescription : eprescription,
            recommendation : recommendation,
            required :required,
            stay_away :stay_away,
            start_eating : start_eating,
            visit : visit,
            hospital_id : hospital_id,
            status : "checkedByDoctor"
        });

        await db.Assistant_Doc_Patient.update({
            status: "checkedByDoctor",
        },{where : {
                id : assistant_doc_patient_id
            }});

        return responseModule.successResponse(res, {
            success: true,
            message: 'Updated successfully',
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    addOutDoorPatient,
    addIndoorPatient,
    getAllPatients,
    examinPatientAssistantDoc,
    getPatientsForDoctor,
    examinPatientByDoc
};
