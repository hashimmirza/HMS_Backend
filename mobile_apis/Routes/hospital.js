
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this file to write the Api routs for user Accounts Authentication
*/

const express = require('express');
const hospitalRoutes = express.Router();
const hospital_controller = require('../Controllers/hospital_controller');

const requiredParameters = require('../Middlewares/requiredParameters');

// /** **************************************** Register  ******************************************* **/

hospitalRoutes.post('/login'
    ,requiredParameters(['username', 'password'])
    ,hospital_controller.login);

module.exports = hospitalRoutes;
