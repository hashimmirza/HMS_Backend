
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this file to write the Api routs for user Accounts Authentication
*/

const express = require('express');
const hospitalRoutes = express.Router();
const hospital_controller = require('../Controllers/hospital_controller');
const h_user_controller = require('../Controllers/h_user_controller');
const h_branch_controller = require('../Controllers/h_branch_controller');
const h_patient_controller = require('../Controllers/h_patient_controller');
const h_doctor_controller = require('../Controllers/h_doctor_controller')
const helper_controller = require('../Controllers/helper_controller');
const h_department_controller = require('../Controllers/h_department_controller');
const h_nurse_controller = require('../Controllers/h_nurse_controller');
const h_emergency_controller = require('../Controllers/h_emergency_controller')
const h_room_controller = require('../Controllers/h_room_controller')
const h_ward_controller = require('../Controllers/h_ward_controller')
const h_building_controller  = require('../Controllers/h_building_controller');
const h_floor_controller = require('../Controllers/h_floor_controller');
const requiredParameters = require('../Middlewares/requiredParameters');

// /** *************************************************************************************************** **/
// /** ******************************** Hospital Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** update profile  *********************** **/
hospitalRoutes.post('/:hospital_id/profile'
    ,helper_controller.verify_hospital_token
    ,requiredParameters(['name', 'username','address','description','owner'])
    ,hospital_controller.updateProfile);

// /** ******************** get profile  *********************** **/
hospitalRoutes.get('/:hospital_id/profile'
    ,helper_controller.verify_hospital_token
    ,hospital_controller.getProfile);



// /** *************************************************************************************************** **/
// /** ******************************** Authentication Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Login  *********************** **/
hospitalRoutes.post('/login'
    ,requiredParameters(['username', 'password'])
    ,hospital_controller.login);





// /** *************************************************************************************************** **/
// /** **************************************** User Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get User Details By CINC  *********************** **/

hospitalRoutes.get('/:hospital_id/user/by_cnic/:cnic'
    ,helper_controller.verify_hospital_token
    ,helper_controller.validate_cnic
    ,h_user_controller.getUserbyCNIC
);




// /** *************************************************************************************************** **/
// /** **************************************** Patient Routes  ******************************************* **/
// /** *************************************************************************************************** **/



// /** ******************** Add Outdoor Patient Details  *********************** **/
hospitalRoutes.post('/:hospital_id/patient/outdoor'
    ,helper_controller.verify_hospital_token
    ,helper_controller.validate_cnic
    ,requiredParameters(['name','age','gender','condition','disease_description','phone_number','cnic','doctor_id'])
    ,h_patient_controller.addOutDoorPatient);



// /** ******************** Add Emergency Patient Details  *********************** **/
hospitalRoutes.post('/:hospital_id/patient/emergency'
    ,helper_controller.verify_hospital_token
    ,requiredParameters(['representor_name','patient_name','age','gender','condition','phone_number','cnic','doctor_id', 'nurse_id'])
    ,helper_controller.validate_cnic
    ,h_emergency_controller.addEmergencyLog
);


// /** ******************** Add Indoor Patient Details  *********************** **/
hospitalRoutes.post('/:hospital_id/patient/indoor'
    ,helper_controller.verify_hospital_token
    ,helper_controller.validate_cnic
    ,requiredParameters(['name','age','gender','condition','disease_description','phone_number','cnic','doctor_id','ward_id','room_id'])
    ,h_patient_controller.addIndoorPatient
);

// /** ******************** Get All Patients *********************** **/
hospitalRoutes.get('/:hospital_id/patient'
    ,helper_controller.verify_hospital_token
    ,h_patient_controller.getAllPatients
);

// /** ******************** examin_by_assistant_doc Assistant doctor *********************** **/
hospitalRoutes.post('/:hospital_id/patient/examin_by_assistant_doc'
    ,helper_controller.verify_hospital_token
    ,requiredParameters(['doctor_id','medical_history_id','blood_pressure','sugar_test','weight','current_medicines','tests_conducted','blood_reports','tag','sleep','eyesight', 'questions_answers'])
    ,h_patient_controller.examinPatientAssistantDoc
);

// /** ******************** Get Patients for Doctor *********************** **/
hospitalRoutes.get('/:hospital_id/patient/patient_for_doctor/:doctor_id'
    ,helper_controller.verify_hospital_token
    ,h_patient_controller.getPatientsForDoctor
);


// /** ******************** examin_by_doc doctor *********************** **/
hospitalRoutes.post('/:hospital_id/patient/examin_by_doc'
    ,helper_controller.verify_hospital_token
    ,requiredParameters(['assistant_doc_patient_id','eprescription','recommendation','required','stay_away','start_eating','visit'])
    ,h_patient_controller.examinPatientByDoc
);






// /** *************************************************************************************************** **/
// /** **************************************** Branches Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Branch By Hospital_id  *********************** **/

hospitalRoutes.get('/:hospital_id/branch'
    ,helper_controller.verify_hospital_token
    ,h_branch_controller.getBranches);



// /** *************************************************************************************************** **/
// /** **************************************** Department Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get All departments   *********************** **/

hospitalRoutes.get('/:hospital_id/departments'
    ,helper_controller.verify_hospital_token
    ,h_department_controller.getDepartments);



// /** ******************** Add department   *********************** **/

hospitalRoutes.post('/:hospital_id/department'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
    ])
    ,h_department_controller.addDepartment);


// /** ******************** Update department   *********************** **/

hospitalRoutes.post('/:hospital_id/department/:department_id'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
    ])
    ,h_department_controller.updateDepartment);






// /** *************************************************************************************************** **/
// /** **************************************** Doctor Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Doctors By Hospital_id  *********************** **/

hospitalRoutes.get('/:hospital_id/doctor'
    ,helper_controller.verify_hospital_token
    ,h_doctor_controller.getAllDoctors);

// /** ******************** Delete Doctor By Hospital_id  *********************** **/

hospitalRoutes.delete('/:hospital_id/doctor/:doctor_id'
    ,helper_controller.verify_hospital_token
    ,h_doctor_controller.deleteDoctor);


// /** ******************** Add Doctor By Hospital_id  *********************** **/

hospitalRoutes.post('/:hospital_id/doctor/'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'age',
        'gender',
        'description',
        'phone_number',
        'cnic',
        'ward_id',
        'specialization',
        'department_id',
        'is_verified'
    ])
    ,h_doctor_controller.addDoctor);

// /** ******************** Update doctor By Hospital_id  *********************** **/

hospitalRoutes.post('/:hospital_id/doctor/:doctor_id'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
            'name',
            'age',
            'gender',
            'description',
            'phone_number',
            'cnic',
            'ward_id',
            'specialization',
            'department_id',
            'is_verified'
    ])
    ,h_doctor_controller.updateDoctor);


// /** ******************** Get Doctors By department_id  *********************** **/

hospitalRoutes.get('/:hospital_id/doctor/:department_id'
    ,helper_controller.verify_hospital_token
    ,h_doctor_controller.getDoctorsByDepartment);





// /** *************************************************************************************************** **/
// /** **************************************** Nurses Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Nurse By department_id  *********************** **/

hospitalRoutes.get('/:hospital_id/nurse/:department_id'
    ,helper_controller.verify_hospital_token
    ,h_nurse_controller.getNurseByDepartment);


// /** ******************** Get All Nurse *********************** **/

hospitalRoutes.get('/:hospital_id/nurse'
    ,helper_controller.verify_hospital_token
    ,h_nurse_controller.getAllNurses);



// /** ******************** Add Nurse *********************** **/

hospitalRoutes.post('/:hospital_id/nurse'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'age',
        'gender',
        'description',
        'phone_number',
        'cnic',
        'ward_id',
        'department_id',
        'is_verified'
    ])
    ,h_nurse_controller.addNurse
);



// /** ******************** Delete Doctor By Hospital_id  *********************** **/

hospitalRoutes.delete('/:hospital_id/nurse/:nurse_id'
    ,helper_controller.verify_hospital_token
    ,h_nurse_controller.deleteNurse);

// /** ******************** Update nurse By Hospital_id  *********************** **/

hospitalRoutes.post('/:hospital_id/nurse/:nurse_id'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
        'is_verified'
    ])
    ,h_nurse_controller.updateNurse);



// /** *************************************************************************************************** **/
// /** **************************************** Rooms Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get All rooms *********************** **/

hospitalRoutes.get('/:hospital_id/room'
    ,helper_controller.verify_hospital_token
    ,h_room_controller.getAllRooms);



// /** ******************** Add Room *********************** **/

hospitalRoutes.post('/:hospital_id/room'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
        'ward_id',
    ])
    ,h_room_controller.addRoom);



// /** ******************** Delete Room  *********************** **/

hospitalRoutes.delete('/:hospital_id/room/:room_id'
    ,helper_controller.verify_hospital_token
    ,h_room_controller.deleteRoom);

// /** ******************** Update rooms  *********************** **/

hospitalRoutes.post('/:hospital_id/room/:room_id'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
        'ward_id',
    ])
    ,h_room_controller.updateRoom);


// /** *************************************************************************************************** **/
// /** **************************************** Wards Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get All wards *********************** **/

hospitalRoutes.get('/:hospital_id/ward'
    ,helper_controller.verify_hospital_token
    ,h_ward_controller.getAllWards);



// /** ******************** Add Ward *********************** **/

hospitalRoutes.post('/:hospital_id/ward'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
        'floor_id',
    ])
    ,h_ward_controller.addWard);



// /** ******************** Delete ward  *********************** **/

hospitalRoutes.delete('/:hospital_id/ward/:ward_id'
    ,helper_controller.verify_hospital_token
    ,h_ward_controller.deleteWard);

// /** ******************** Update wards  *********************** **/

hospitalRoutes.post('/:hospital_id/ward/:ward_id'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description',
        'floor_id',
    ])
    ,h_ward_controller.updateWard);




// /** *************************************************************************************************** **/
// /** **************************************** Building Routes ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get All wards *********************** **/

hospitalRoutes.get('/:hospital_id/building'
    ,helper_controller.verify_hospital_token
    ,h_building_controller.getAllBuilding);



// /** ******************** Add Building *********************** **/

hospitalRoutes.post('/:hospital_id/building'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description'
    ])
    ,h_building_controller.addBuilding);



// /** ******************** Delete Building  *********************** **/

hospitalRoutes.delete('/:hospital_id/building/:building_id'
    ,helper_controller.verify_hospital_token
    ,h_building_controller.deleteBuilding);

// /** ******************** Update Building  *********************** **/

hospitalRoutes.post('/:hospital_id/building/:building_id'
    ,helper_controller.verify_hospital_token
    ,requiredParameters([
        'name',
        'description'
    ])
    ,h_building_controller.updateBuilding);





// /** *************************************************************************************************** **/
// /** **************************************** Floor Routes ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get All floors by building id*********************** **/

hospitalRoutes.get('/:hospital_id/floor/:building_id'
    ,helper_controller.verify_hospital_token
    ,h_floor_controller.getAllFloors);



module.exports = hospitalRoutes;
