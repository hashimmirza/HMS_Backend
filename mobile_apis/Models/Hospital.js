const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Hospital = sequelize.define('Hospital',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        address: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        username: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        password: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        access_token: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        token_expire_time: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        owner: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_verified: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue : "false"
        }
    },{

        timestamps : true,
        associate : models => {
            Hospital.hasMany(models.Branch, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Medical_practitioner, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Indoor_patient, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Nurse, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Assistant_doctor, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Doctor, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Department, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Hospital_doctor_department, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Hospital_nurse_department, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Emergency_logs, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Hospital_rooms, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Ward, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Building, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
            Hospital.hasMany(models.Assistant_Doc_Patient, {
                foreignKey: { name: 'hospital_id', allowNull: false }
            });
        }
    });
    return Hospital ;
};
