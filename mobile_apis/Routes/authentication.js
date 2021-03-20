
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this file to write the Api routs for user Accounts Authentication
*/

const express = require('express');
const authenticationRoutes = express.Router();
const auth_controller = require('../Controllers/auth_controller');
const helper_controller = require('../Controllers/helper_controller');
const requiredParameters = require('../Middlewares/requiredParameters');

// /** **************************************** Register  ******************************************* **/

authenticationRoutes.post('/signup'
    ,requiredParameters(['email', 'password', 'full_name', 'player_id'])
    ,auth_controller.create);

module.exports = authenticationRoutes;
