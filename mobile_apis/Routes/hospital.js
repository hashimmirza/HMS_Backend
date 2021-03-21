
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this file to write the Api routs for user Accounts Authentication
*/

const express = require('express');
const hospitalRoutes = express.Router();
const hospital_controller = require('../Controllers/hospital_controller');
const h_patient_controller = require('../Controllers/h_patient_controller');
const h_user_controller = require('../Controllers/h_user_controller');
const h_branch_controller = require('../Controllers/h_branch_controller');

const helper_controller = require('../Controllers/helper_controller');

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
    ,requiredParameters(['cnic'])
    ,h_user_controller.getUserbyCNIC);







// /** *************************************************************************************************** **/
// /** **************************************** Patient Routes  ******************************************* **/
// /** *************************************************************************************************** **/



// /** ******************** Add Patient Details  *********************** **/
hospitalRoutes.post('/patient/'
    //authenticate token from header
    ,requiredParameters(['name','age','gender','condition','disease_description','phone_number','cnic', 'department_id','doctor_id'])
    ,h_patient_controller.login);









// /** *************************************************************************************************** **/
// /** **************************************** Hospital Department Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Building by Hospital Id   *********************** **/
hospitalRoutes.get('/building/:hospital_id'
    //authenticate token from header
    ,h_patient_controller.login);






// /** *************************************************************************************************** **/
// /** **************************************** Hospital Doctors Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Doctors by Hospital Id   *********************** **/
hospitalRoutes.get('/doctor/:hospital_id'
    //authenticate token from header
    ,h_patient_controller.login);





// /** *************************************************************************************************** **/
// /** **************************************** Branches Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Branch By Hospital_id  *********************** **/

hospitalRoutes.get('/:hospital_id/branch'
    ,helper_controller.verify_hospital_token
    ,h_branch_controller.getBranches);








module.exports = hospitalRoutes;
