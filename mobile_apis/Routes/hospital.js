
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


// /** ********************Get Patient Details By CINC  *********************** **/

hospitalRoutes.get('/patient/by_cinc'
    //authenticate token from header
    ,requiredParameters(['cnic'])
    ,h_patient_controller.login);


// /** *************************************************************************************************** **/
// /** **************************************** Hospital Department Routes  ******************************************* **/
// /** *************************************************************************************************** **/


// /** ******************** Get Department by Hospital Id   *********************** **/

hospitalRoutes.get('/department/:hospital_id'
    //authenticate token from header
    ,requiredParameters(['cnic'])
    ,h_patient_controller.login);





module.exports = hospitalRoutes;
