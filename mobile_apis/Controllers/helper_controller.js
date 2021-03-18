const db = require('../../config/sequelize').db;

const responseModule = require('../../config/response');

let verify_api_key = async (req, res, next) => {
    try {
        if (req.headers.api_key != undefined) {
            let foundData = await db.User.findOne({
                where: {
                    api_key: req.headers.api_key
                }
            });
            if (foundData != null) {
                req.user = foundData;
                return next();
            } else {
                if(req.headers.api_key === process.env.MASTER_KEY){
                    return next();
                }else{
                    return responseModule.failResponse(res, {
                        success: false,
                        message: 'Invalid Api key ! '
                    });
                }
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: "Please provide API Key !"
            });
        }
    } catch (err) {
        console.log(req.headers.api_key)
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let verify_product = async (req, res, next) => {
    try {
        if (req.body.product_id != "") {

            let foundData = await db.Product.findOne({
                where: {
                    id: req.body.product_id,
                    is_deleted: "false"
                }
            });

            if (foundData != null) {
                return next();
            } else {
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Invalid Product Id ! '
                });
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: "Please provide Product Id !"
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let verify_group = async (req, res, next) => {
    try {
        if (req.body.group_id != "" && req.body.group_id != undefined) {
            let user = await db.User.findOne({
                where: {
                    api_key: req.headers.api_key
                }
            });

            let foundData = await db.Group.findOne({
                where: {
                    id: req.body.group_id,
                    user_id: user.id
                }
            });

            if (foundData != null) {
                return next();
            } else {
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Invalid Group Id ! '
                });
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: "Please provide Group Id !"
            });
        }
    } catch (err) {
        console.log(req.headers.api_key)
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let verify_lifestyle_tags = async (req, res, next) => {
    try {
        let life_tags = req.body.lifestyle_tags;
        if(req.body.lifestyle_tags !== undefined && !life_tags.includes('')){
            if (!life_tags.some(isNaN)) {
                if (life_tags.length < 11) {
                    let lifestyle_tags = await db.Lifestyle_tags.findAll({
                        where: {
                            id: {
                                $in: life_tags
                            }
                        }
                    });
                    if (lifestyle_tags.length == life_tags.length) {
                        return next();
                    } else {
                        return responseModule.failResponse(res, {
                            success: false,
                            message: 'Invalid id of Lifestyle Tags'
                        });
                    }
                } else {
                    return responseModule.failResponse(res, {
                        success: false,
                        message: 'You can only add 10 Lifestyle Tags'
                    });
                }
            } else {

                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Lifestyle tags must be a number array !'
                });
            }
        }else{
            return responseModule.failResponse(res, {
                success: false,
                error: "Lifestyle Tags Missing "
            });
        }
    } catch (err) {
        console.log(req.headers.api_key)
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let verify_url = async (req, res, next) => {
    try {
        if (req.body.url != undefined) {
            if (req.body.url != '') {
                return next();
            } else {
                return responseModule.failResponse(res, {
                    success: false,
                    message: 'Invalid URL ! '
                });
            }
        } else {
            return responseModule.failResponse(res, {
                success: false,
                message: "Please provide URL !"
            });
        }
    } catch ( err ) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }

};
let verify_get_groups_or_get_products_api = async  (req, res , next) => {
    try {
        let {user_id} = req.query;
        let {api_key} = req.headers;
        let user = await db.User.findOne({where: {api_key: api_key}});
        let userObject = JSON.parse(JSON.stringify(user));
        if (user_id == undefined) {
            if(userObject === null && api_key === process.env.MASTER_KEY){
                return responseModule.failResponse(res, {
                    success: false,
                    message: "Unable to get information without login !"
                });
            }else{
                return next();
            }
        } else {
            if (user_id == '') {
                return responseModule.failResponse(res, {
                    success: false,
                    message: "user_id is missing"
                });
            } else {
                return next();
            }
        }
    }catch (e) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }

};
let restrict_master_key = async (req, res , next) => {
    try {
                if(req.headers.api_key === process.env.MASTER_KEY){
                    return responseModule.failResponse(res, {
                        success: false,
                        message: 'Unable to get information without login !'
                    });
                }else{
                    return next();
                }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
module.exports = {
    verify_api_key,
    verify_product,
    verify_group,
    verify_lifestyle_tags,
    verify_url,
    verify_get_groups_or_get_products_api,
    restrict_master_key
};
