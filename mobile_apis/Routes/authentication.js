
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this file to write the Api routs for user Accounts Authentication
*/

const express = require('express');
const authenticationRoutes = express.Router();
const auth_controller = require('../Controllers/auth_controller');
const helper_controller = require('../Controllers/helper_controller');
const requiredParameters = require('../Middlewares/requiredParameters');

// /** **************************************** Register by Email ******************************************* **/

authenticationRoutes.post('/signup'
    ,requiredParameters(['email', 'password', 'full_name', 'player_id'])
    ,auth_controller.create);

// /** **************************************** Login/signUp with Gmail  ******************************************* **/

authenticationRoutes.post('/login_with_google'
    ,requiredParameters(['email', 'full_name','google_id','player_id'])
    ,auth_controller.login_with_google);


// /** **************************************** Login/signUp with Apple  ******************************************* **/

authenticationRoutes.post('/login_with_apple'
    ,requiredParameters(['token','apple_id','player_id'])
    ,auth_controller.login_with_apple);


// /** **************************************** Logout User  ******************************************* **/

authenticationRoutes.post('/logout'
    ,helper_controller.verify_api_key
    ,helper_controller.restrict_master_key
    ,auth_controller.logout);

// /** **************************************** Login with Email  ******************************************* **/

authenticationRoutes.post('/login'
    ,requiredParameters(['email','password','player_id'])
    ,auth_controller.login);

// /** **************************************** Change Password  ******************************************* **/

authenticationRoutes.post('/change_password'
    ,requiredParameters(['old_password','new_password' ])
    ,helper_controller.verify_api_key
    ,helper_controller.restrict_master_key
    ,auth_controller.changePassword);

// /** **************************************** Reset Password  ******************************************* **/

authenticationRoutes.post('/reset_password'
    ,requiredParameters(['email']),
    auth_controller.updateResetToken,
    auth_controller.resetPassword
);

// /** **************************************** Resend Verification Code  ******************************************* **/

authenticationRoutes.post('/resend_verification_code'
    ,requiredParameters(['email']),
    auth_controller.resendVerificationCode
);

// /** **************************************** Web page routes and functions  ******************************************* **/

authenticationRoutes.get('/reset_password_page/'
    ,auth_controller.validate_reset_token
    ,auth_controller.send_reset_view
);

// /** **************************************** Web page routes and functions  ******************************************* **/

authenticationRoutes.post('/reset_password_page/resetUserPassword'
    ,auth_controller.resetUserPassword
);

authenticationRoutes.get('/verify_user/'
    ,auth_controller.validate_verification_token
    ,auth_controller.verifyUser
);

// /** **************************************** Verify Code ******************************************* **/

authenticationRoutes.post('/verify_authentication_code/'
    ,requiredParameters(['code'])
    ,helper_controller.verify_api_key
    ,helper_controller.restrict_master_key
    ,auth_controller.validate_verification_code
    ,auth_controller.verifyUserByCode
);


module.exports = authenticationRoutes;