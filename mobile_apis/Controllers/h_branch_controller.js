const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getBranches = async (req, res, next) => {
    let {hospital_id} = req.params;
    try {
        let branches = await db.Branch.findAll({where : {hospital_id: hospital_id}});
        return responseModule.successResponse(res, {
            success: true,
            branches: branches
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    getBranches
};
