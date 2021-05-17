const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let login = async (req, res, next) => {
    let {
        username,
        password
    } = req.body;
    try {
        let hospital = await db.Hospital.findOne({where : {username: username,}});
        if(hospital === null){
            return responseModule.failResponse(res, {
                success: false,
                message: 'Invalid Username !'
            });
        }else{
            if(hospital.password === password) {

                let access_token = await randomUniqueString(50, '123456789abcdefghijkl_@$%');
                await db.Hospital.update(
                    {access_token : access_token},
                    {where: {username : username}}
                    );
                let updated_hospital = await db.Hospital.findOne({where : {username: username,}});

                return responseModule.successResponse(res, {
                    success: true,
                    message: 'Login Successfully !',
                    hospital : updated_hospital
                });
            }else{
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Invalid Password !'
                });
            }
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err.toString()
        });
    }
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
let updateProfile = async (req, res, next) => {
    let {
        name,
        address,
        description,
        owner,
        username,
    } = req.body;
    let {hospital_id} = req.params ;
    try {
        let hospital = await db.Hospital.findOne({where : {id: hospital_id,}});
        if(hospital === null){
            return responseModule.failResponse(res, {
                success: false,
                message: 'Invalid Username !'
            });
        }else{
            await db.Hospital.update(
                {
                    name : name,
                    address : address,
                    description : description,
                    owner : owner
                },
                {where: {id : hospital_id}}
            );
            let updated_hospital = await db.Hospital.findOne({where : {username: username,}});

            return responseModule.successResponse(res, {
                success: true,
                message: 'Updated Successfully !',
                hospital : updated_hospital
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err.toString()
        });
    }
};
let getProfile = async (req, res, next) => {
    let {hospital_id} = req.params ;
    try {
        let hospital = await db.Hospital.findOne({where : {id: hospital_id,}});
        if(hospital === null){
            return responseModule.failResponse(res, {
                success: false,
                message: 'Invalid Hospital Id !'
            });
        }else{
            return responseModule.successResponse(res, {
                success: true,
                message: 'Hospital found Successfully !',
                hospital : hospital
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err.toString()
        });
    }
};


module.exports = {
    login,
    updateProfile,
    getProfile
};
