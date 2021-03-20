
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this file to write the Api routs for user Accounts Authentication
*/

const express = require('express');
const hospitalRoutes = express.Router();
const hospital_controller = require('../Controllers/hospital_controller');
const h_patient_controller = require('../Controllers/h_patient_controller');
const requiredParameters = require('../Middlewares/requiredParameters');


// /** *************************************************************************************************** **/
// /** ******************************** Authentication Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Login  *********************** **/

hospitalRoutes.post('/login'
    ,requiredParameters(['username', 'password'])
    ,hospital_controller.login);


// /** *************************************************************************************************** **/
// /** **************************************** Patient Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Patient Details By CINC  *********************** **/

hospitalRoutes.get('/patient/by_cinc'
    //authenticate token from header
    ,requiredParameters(['cnic'])
    ,h_patient_controller.login);

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





module.exports = hospitalRoutes;
