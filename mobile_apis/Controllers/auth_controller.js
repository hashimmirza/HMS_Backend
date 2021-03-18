const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mailer = require('../Middlewares/mailer');
const tokenService = require('./../Services/token');
let create = async (req, res, next) => {
    let {
        email,
        password,
        full_name,
        player_id
    } = req.body;
    try {
        let foundData = await db.User.findAll({
            where: {
                [Op.or]: [{
                    email: email
                }, {
                    secondary_email: email
                }]
            }
        });
        if (foundData != '') {
            return responseModule.failResponse(res, {
                success: false,
                message: 'Email Already Exists !'
            });

        } else {
            let hash = await bcrypt.hashSync(password, 10);
            let api_key = await randomUniqueString(25, '123456789abcdefghi_@#$%');
            let verification_token = await randomUniqueString(50, '123456789abcdefghijkl_@$%');
            let user = await db.User.create({
                email: email,
                password: hash,
                full_name: full_name,
                api_key: api_key,
                verification_token: verification_token
            });
            let response = user.get({
                plain: true
            });
            delete response.password;
            delete response.verification_token;

            let deviceWithID = await db.User_devices.findOne({
                where: {
                    player_id: player_id
                }
            });
            if (deviceWithID !== null) {
                await db.User_devices.update({
                    user_id: response.id,
                    is_login: "true"
                }, {
                    where: {
                        player_id: player_id
                    }
                });
            }else{
                await db.User_devices.create({
                    player_id: player_id,
                    is_login: 'false',
                    user_id: response.id
                });
            }
            if (response) {
                // let verification_link = `${process.env.baseURL}api/auth/verify_user/?verification_token=${verification_token}`;
                // let mail = await mailer.sendVerificationMail(verification_link, email);

                let verification_code = await randomUniqueCode(6, '123456789');

                let updatedUser = await db.User.update({
                    verification_token: verification_code
                }, {
                    where: {
                        email: email
                    }
                });

                let mail = await mailer.sendVerificationCodeMail(verification_code, email);


                return responseModule.successResponse(res, {
                    success: true,
                    message: 'You are successfully registered. We\'ve sent you an email for verification. Please verify that and login in again',
                    user: response
                });
            }
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let login_with_google = async (req, res, next) => {
    const {
        email,
        full_name,
        google_id,
        player_id
    } = req.body;
    try {
        let foundData = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (foundData != null) {
            if(foundData.apple_id === null && foundData.google_id !== null){

                let response = foundData.get({
                    plain: true
                });
                delete response.password;
                let device = await db.User_devices.findOne({
                    where: {
                        user_id: response.id,
                        player_id: player_id
                    }
                });
                if (device !== null) {
                    let updatedDevice = await db.User_devices.update({
                        is_login: "true"
                    }, {
                        where: {
                            user_id: response.id,
                            player_id: player_id
                        }
                    });
                } else {
                    let deviceWithID = await db.User_devices.findOne({
                        where: {
                            player_id: player_id
                        }
                    });
                    if (deviceWithID !== null) {
                        await db.User_devices.update({
                            user_id: response.id,
                            is_login: "true"
                        }, {
                            where: {
                                player_id: player_id
                            }
                        });
                    }else{
                        await db.User_devices.create({
                            player_id: player_id,
                            is_login: 'true',
                            user_id: response.id
                        });
                    }
                }
                let user = await db.User.findOne({
                    where: {
                        email: email
                    }
                });
                let reponseObj = JSON.parse(JSON.stringify(user))
                let lifestyle_tags = await db.User_lifestyle_tags.findOne({
                    where: {
                        user_id : reponseObj.id
                    }
                });

                if(lifestyle_tags !== null){
                    reponseObj.haveLifestyleTags = true ;
                }else{
                    reponseObj.haveLifestyleTags = false ;
                }

                return responseModule.successResponse(res, {
                    success: true,
                    message: 'User Login Successfully !',
                    user: reponseObj
                });
            }else{

                return responseModule.failResponse(res, {
                    success: false,
                    message: 'User Already Registered !'
                });
            }

        } else {
            let api_key = await randomUniqueString(25, '123456789abcdefghi_@#$%')
            let user = await db.User.create({
                email: email,
                full_name: full_name,
                google_id: google_id,
                api_key: api_key
            });
            if (user) {
                let response = JSON.parse(JSON.stringify(user))
                let deviceWithID = await db.User_devices.findOne({
                    where: {
                        player_id: player_id
                    }
                });
                if (deviceWithID !== null) {
                    await db.User_devices.update({
                        user_id: response.id,
                        is_login: "true"
                    }, {
                        where: {
                            player_id: player_id
                        }
                    });
                }else{
                    await db.User_devices.create({
                        player_id: player_id,
                        is_login: "false",
                        user_id: response.id
                    });
                }
                let reponseObj = JSON.parse(JSON.stringify(user))

                    reponseObj.haveLifestyleTags = false ;

                return responseModule.successResponse(res, {
                    success: true,
                    message: 'User Registered Successfully !',
                    user: reponseObj
                });
            }
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let logout = async (req, res, next) => {
    const {
        api_key
    } = req.headers;
    let foundData = await db.User.findOne({
        where: {
            api_key: api_key
        }
    });
    if (foundData != null) {
        let reponseObj = JSON.parse(JSON.stringify(foundData));
        console.log(reponseObj.id);

        let updatedUser = await db.User_devices.update({
            is_login: 'false'
        }, {
            where: {
                user_id: reponseObj.id
            }
        });

        console.log(updatedUser);
        return responseModule.successResponse(res, {
            success: true,
            message: 'Logout Successfully !'
        });
        // if(reponseObj.logged_in == 'false'){
        //     return responseModule.failResponse(res, {
        //         success: false,
        //         message: 'Please login first to logout !'
        //     });
        // }else{
        //
        // }
    } else {
        return responseModule.failResponse(res, {
            success: false,
            message: 'No such user exist !'
        });
    }

};
let login = async (req, res, next) => {
    const {
        email,
        password,
        player_id
    } = req.body;
    try {
        let foundData = await db.User.findOne({
            where: {
                email: email
            }
        });
        let reponseObj = JSON.parse(JSON.stringify(foundData));
        if (reponseObj != null) {
            if (bcrypt.compareSync(password, reponseObj.password)) {
                // Passwords match
                delete reponseObj.password;
                    let device = await db.User_devices.findOne({
                        where: {
                            user_id: reponseObj.id,
                            player_id: player_id
                        }
                    });
                    if (device !== null) {
                        let updatedDevice = await db.User_devices.update({
                            is_login: "true"
                        }, {
                            where: {
                                user_id: reponseObj.id,
                                player_id: player_id
                            }
                        });
                    } else {
                        let deviceWithID = await db.User_devices.findOne({
                            where: {
                                player_id: player_id
                            }
                        });
                        if (deviceWithID !== null) {
                            await db.User_devices.update({
                                user_id: reponseObj.id,
                                is_login: "true"
                            }, {
                                where: {
                                    player_id: player_id
                                }
                            });
                        }else{
                            await db.User_devices.create({
                                player_id: player_id,
                                is_login: 'true',
                                user_id: reponseObj.id
                            });
                        }
                    }

                let lifestyle_tags = await db.User_lifestyle_tags.findOne({
                    where: {
                        user_id : reponseObj.id
                    }
                });

                if(lifestyle_tags !== null){
                    reponseObj.haveLifestyleTags = true ;
                }else{
                    reponseObj.haveLifestyleTags = false ;
                }
                    return responseModule.successResponse(res, {
                        success: true,
                        message: 'User Login Successfully !',
                        user: reponseObj
                    });
            } else {
                // Passwords don't match
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Invalid Password !'
                });
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: 'Email Not Exists !'
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let changePassword = async (req, res, next) => {
    const {
        api_key
    } = req.headers;
    const {
        old_password,
        new_password
    } = req.body;

    let foundData = await db.User.findOne({
        where: {
            api_key: api_key
        }
    });
    if (foundData != null) {
        let reponseObj = JSON.parse(JSON.stringify(foundData));
        if (reponseObj.google_id != null || reponseObj.apple_id !== null) {
            return responseModule.failResponse(res, {
                success: false,
                message: 'You can not edit Password when you are login with Social Account !'
            });
        } else {

            let verifyPassword = await bcrypt.compare(old_password, reponseObj.password);
            if (verifyPassword) {
                let hash = await bcrypt.hashSync(new_password, 10);
                let verifyOldPassword = await bcrypt.compare(old_password, new_password);
                if (verifyOldPassword) {
                    return responseModule.failResponse(res, {
                        success: false,
                        message: 'Use new password !'
                    });
                } else {
                    let updatedUser = await db.User.update({
                        password: hash
                    }, {
                        where: {
                            api_key: api_key
                        }
                    });
                    if (updatedUser) {
                        return responseModule.successResponse(res, {
                            success: true,
                            message: 'Password Updated Successfully !'
                        });
                    }
                }
            } else {
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Old password is Incorrect !'
                });
            }
        }
    } else {
        return responseModule.failResponse(res, {
            success: false,
            message: 'No such user exist !'
        });
    }

};
let resetPassword = async (req, res, next) => {
    const {
        email
    } = req.body;
    let url = `${process.env.baseURL}api/auth/reset_password_page/?token=${req.resetToken}`;
    let mail = await mailer.sendResetPasswordMail(url, email);
    if (mail) {
        return responseModule.successResponse(res, {
            success: true,
            message: `Reset Password link sent to ${email} `
        });

    } else {
        return responseModule.failResponse(res, {
            success: false,
            message: `Email sending fail !`
        });

    }
};
let updateResetToken = async (req, res, next) => {
    const {
        email
    } = req.body;
    let foundData = await db.User.findOne({
        where: {
            email: email
        }
    });
    if (foundData != null) {
        if (foundData.google_id !== null || foundData.apple_id !== null) {
            return responseModule.failResponse(res, {
                success: false,
                message: 'You can not reset password , Your account is registered through Social Network'
            });
        } else {
            let currentdate = new Date();
            let tokenExpireTime = new Date(currentdate.getTime() + 30 * 60000);
            let resetToken = await randomUniqueString(35, '123456789abcdefghi_@$%');
            req.resetToken = resetToken;
            let updatedUser = await db.User.update({
                reset_token: resetToken,
                reset_token_expires: tokenExpireTime
            }, {
                where: {
                    email: email
                }
            });
            return next();
        }
    } else {
        return responseModule.failResponse(res, {
            success: false,
            message: 'No user exist with this email , Please register first !'
        });
    }

};
let resendVerificationCode = async (req, res, next) => {
    let {
        email
    } = req.body;
    let user = await db.User.findOne({
        where: {
            email: email
        }
    });
    let reponseObj = JSON.parse(JSON.stringify(user));
    if (reponseObj != null) {
        let date = new Date(reponseObj.updatedAt)
         let newDate = date.setMinutes(date.getMinutes() +1);
        let currentTime = new Date();
        console.log("updated time : " , newDate);

        console.log("current time : " , currentTime);
        if( currentTime > newDate){
            console.log("current time is greater then updated time ");
            let verification_code = await randomUniqueCode(6, '123456789');

            let updatedUser = await db.User.update({
                verification_token: verification_code
            }, {
                where: {
                    email: email
                }
            });
            let mail = await mailer.sendVerificationCodeMail(verification_code, email);
            return responseModule.successResponse(res, {
                success: true,
                message: 'Verification link sent to your email !'
            });
        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: 'You are sending Code too fast ! Please wait for while.'
            });

        }


    } else {
        return responseModule.failResponse(res, {
            success: false,
            message: 'No user found with this email !'
        });
    }

};
let validate_reset_token = async (req, res, next) => {
    const {
        token
    } = req.query;
    let user = await db.User.findOne({
        where: {
            reset_token: token
        }
    });
    let reponseObj = JSON.parse(JSON.stringify(user));
    let currentdate = new Date();
    if (reponseObj != null) {
        if ((new Date(currentdate).getTime() < new Date(reponseObj.reset_token_expires).getTime())) {
            return next();
        } else {
            res.render('resetLinkExpires');
        }
    } else {
        res.render('resetLinkExpires');
    }
};
let send_reset_view = async (req, res, next) => {
    const {
        token
    } = req.query;
    res.render('resetPassword', {
        reset_token: token
    });
};
let resetUserPassword = async (req, res, next) => {

    const {
        reset_token
    } = req.body;
    let user = await db.User.findOne({
        where: {
            reset_token: reset_token
        }
    });
    let reponseObj = JSON.parse(JSON.stringify(user));
    if (reponseObj != null) {
        let hash = await bcrypt.hashSync(req.body.password, 10);

        let updatedUser = await db.User.update({
            password: hash
        }, {
            where: {
                reset_token: reset_token
            }
        });
        res.render('passwordUpdated', {
            reset_token: reset_token
        });

    } else {
        res.render('resetLinkExpires');
    }


};
let validate_verification_token = async (req, res, next) => {
    const {
        verification_token
    } = req.query;
    let user = await db.User.findOne({
        where: {
            verification_token: verification_token
        }
    });
    let reponseObj = JSON.parse(JSON.stringify(user));
    if (reponseObj != null) {
        if (reponseObj.verification_token === verification_token) {
            return next();
        } else {
            res.render('resetLinkExpires');
        }
    } else {
        res.render('resetLinkExpires');
    }
};
let verifyUser = async (req, res, next) => {
    const {
        verification_token
    } = req.query;
    let updatedUser = await db.User.update({
        is_verified: 'true'
    }, {
        where: {
            verification_token: verification_token
        }
    });
    res.render('userVerified');
};
let validate_verification_code = async (req, res, next) => {
    const {
        code
    } = req.body;
    const {
        api_key
    } = req.headers;
    let user = await db.User.findOne({
        where: {
            api_key: api_key
        }
    });
    let reponseObj = JSON.parse(JSON.stringify(user));
    if (reponseObj != null) {
        if (reponseObj.verification_token === code) {
            let date = new Date(reponseObj.updatedAt)
            let myDate = new Date(date.getTime()+(2*24*60*60*1000));
            let currentTime = new Date();
            if( currentTime < myDate){
                return next();
            }else{
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Code is expired , please resend a new code.'
                });
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: 'Invalid Verification Code !'
            });
        }
    } else {
        return responseModule.failResponse(res, {
            success: false,
            message: 'Invalid Verification Code !'
        });
    }
};
let verifyUserByCode = async (req, res, next) => {
    const {
        code
    } = req.body;
    let updatedUser = await db.User.update({
        is_verified: 'true'
    }, {
        where: {
            verification_token: code
        }
    });
    return responseModule.successResponse(res, {
        success: true,
        message: 'User Verified !'
    });
};
let randomUniqueString = (len, arr) => {
    let timestamp = new Date().getUTCMilliseconds()

    let ans = '';
    for (var i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    let randomString = ans + timestamp;
    return randomString;
};
let randomUniqueCode = (len, arr) => {
    let ans = '';
    for (var i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
};
let login_with_apple = async (req, res, next) => {
    const {
        email,
        token,
        full_name,
        apple_id,
        player_id
    } = req.body;
    try {
        let foundData = await db.User.findOne({
            where: {
                apple_id: apple_id
            }
        });
        if (foundData != null) {
            if(email !== undefined && email !== null ){
                let UserWithEmail = await db.User.findOne({
                    where: {
                        email: email
                    }
                });
                if(UserWithEmail !== null ){
                    if(UserWithEmail.apple_id === null){
                        return responseModule.failResponse(res, {
                            success: false,
                            message: 'User Alreasy Exist !'
                        });
                    }else{
                        if(UserWithEmail.apple_id !== apple_id){
                            return responseModule.failResponse(res, {
                                success: false,
                                message: 'User Alreasy Exist !'
                            });
                        }else{
                            await db.User.update({
                                email: email
                            }, {
                                where: {
                                    apple_id: apple_id
                                }
                            });
                        }
                    }
                }else{
                    await db.User.update({
                        email: email
                    }, {
                        where: {
                            apple_id: apple_id
                        }
                    });

                }
            }

            let updatedUserAfterEmail = await db.User.findOne({
                where: {
                    apple_id: apple_id
                }
            });

            let response = updatedUserAfterEmail.get({
                plain: true
            });
            delete response.password;
            let device = await db.User_devices.findOne({
                where: {
                    user_id: response.id,
                    player_id: player_id
                }
            });
            if (device !== null) {
                let updatedDevice = await db.User_devices.update({
                    is_login: "true"
                }, {
                    where: {
                        user_id: response.id,
                        player_id: player_id
                    }
                });
            } else {
                let deviceWithID = await db.User_devices.findOne({
                    where: {
                        player_id: player_id
                    }
                });
                if (deviceWithID !== null) {
                    await db.User_devices.update({
                        user_id: response.id,
                        is_login: true
                    }, {
                        where: {
                            player_id: player_id
                        }
                    });
                }else{
                    await db.User_devices.create({
                        player_id: player_id,
                        is_login: true,
                        user_id: response.id
                    });
                }
            }
            let user = await db.User.findOne({
                where: {
                    apple_id: apple_id
                }
            });
            if(user.username === "" || user.username === null){
                user.username = '';
            }
            user.secondary_email = "";
            user.password = "";
            user.verification_token = "";
            user.profile_picture = "";
            user.cover_picture = "";
            user.website = "";
            user.player_id = "";
            user.reset_token = "";
            user.reset_token_expires = "";

            let reponseObj = JSON.parse(JSON.stringify(user))
            let lifestyle_tags = await db.User_lifestyle_tags.findOne({
                where: {
                    user_id : reponseObj.id
                }
            });

            if(lifestyle_tags !== null){
                reponseObj.haveLifestyleTags = true ;
            }else{
                reponseObj.haveLifestyleTags = false ;
            }


            return responseModule.successResponse(res, {
                success: true,
                message: 'User Login Successfully !',
                user: reponseObj
            });

        } else {



            await tokenService.verify(req.body, async (err) => {
                if (err) {
                    return responseModule.failResponse(res, {
                        success: false,
                        message: err.message,
                    });
                } else {

                    let appleEmail ;
                    let appleFullname;
                    let randomString = await randomUniqueString(7, '123456789abcdefghi_@#$%')

                    if(email === undefined){
                        appleEmail =  randomString + "@privaterelay.com";
                    }else{
                        appleEmail = email;
                    }
                    if(full_name === undefined){
                        appleFullname = "Pantery User"
                    }else{
                        appleFullname = full_name ;
                    }

                    let userWithEmail = await db.User.findOne({
                        where: {
                            email: email
                        }
                    });

                    if(userWithEmail !== null ){
                        return responseModule.failResponse(res, {
                            success: false,
                            message: 'User Already registered',
                        });

                    }else{
                        let api_key = await randomUniqueString(25, '123456789abcdefghi_@#$%')

                        let user = await db.User.create({
                            email: email,
                            full_name: full_name,
                            apple_id: apple_id,
                            api_key: api_key
                        });

                        if (user) {
                            let response = JSON.parse(JSON.stringify(user))
                            let deviceWithID = await db.User_devices.findOne({
                                where: {
                                    player_id: player_id
                                }
                            });
                            if (deviceWithID !== null) {
                                await db.User_devices.update({
                                    user_id: response.id,
                                    is_login: "true"
                                }, {
                                    where: {
                                        player_id: player_id
                                    }
                                });
                            }else{
                                await db.User_devices.create({
                                    player_id: player_id,
                                    is_login: "true",
                                    user_id: response.id
                                });
                            }

                            let userWithAlDetails = await db.User.findOne({
                                where: {
                                    id: user.id
                                }
                            });

                            if(userWithAlDetails.username === "" || userWithAlDetails.username === null){
                                userWithAlDetails.username = '';
                            }

                            console.log("user" , JSON.parse(JSON.stringify(userWithAlDetails)));
                            console.log("username", userWithAlDetails.username);
                            userWithAlDetails.secondary_email = "";
                            userWithAlDetails.password = "";
                            userWithAlDetails.verification_token = "";
                            userWithAlDetails.profile_picture = "";
                            userWithAlDetails.cover_picture = "";
                            userWithAlDetails.website = "";
                            userWithAlDetails.player_id = "";
                            userWithAlDetails.reset_token = "";
                            userWithAlDetails.reset_token_expires = "";
                            userWithAlDetails.haveLifestyleTags = false ;


                            return responseModule.successResponse(res, {
                                success: true,
                                message: 'User Registered Successfully !',
                                user: userWithAlDetails
                            });
                        }

                    }

                }

            })
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    create,
    login_with_google,
    logout,
    login,
    changePassword,
    resetPassword,
    updateResetToken,
    resendVerificationCode,
    validate_reset_token,
    send_reset_view,
    resetUserPassword,
    validate_verification_token,
    verifyUser,
    login_with_apple,
    validate_verification_code,
    verifyUserByCode
};