const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Admin = sequelize.define('Admin',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.INTEGER,
            defaultValue : null
        },
        cnic: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },access_token: {
            type: Sequelize.STRING,
            defaultValue : null
        }
    },{
        timestamps : true,
        associate : models => {
            // Admin.hasMany(models.Patient, {
            //     foreignKey: { name: 'user_id', allowNull: false }
            // });
            // Admin.hasMany(models.Technician, {
            //     foreignKey: { name: 'user_id', allowNull: false }
            // });
            // Admin.hasMany(models.Medical_practitioner, {
            //     foreignKey: { name: 'user_id', allowNull: false }
            // });
            // Admin.hasMany(models.Emergency_logs, {
            //     foreignKey: { name: 'user_id', allowNull: false }
            // });
            //
        }
    });
    return Admin ;
};
