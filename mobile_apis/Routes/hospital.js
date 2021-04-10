
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

const requiredParameters = require('../Middlewares/requiredParameters');


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

hospitalRoutes.get('/:hospital_id/user/by_cnic'
    ,helper_controller.verify_hospital_token
    ,helper_controller.validate_cnic
    ,requiredParameters(['cnic'])
    ,h_user_controller.getUserbyCNIC);







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
    ,helper_controller.validate_cnic
    ,requiredParameters(['representor_name','patient_name','age','gender','condition','phone_number','cnic','doctor_id', 'nurse_id'])
    ,h_emergency_controller.addEmergencyLog);



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







// /** *************************************************************************************************** **/
// /** **************************************** Doctors Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Doctors By Hospital_id  *********************** **/

hospitalRoutes.get('/:hospital_id/doctor'
    ,helper_controller.verify_hospital_token
    ,h_doctor_controller.getAllDoctors);

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








module.exports = hospitalRoutes;
