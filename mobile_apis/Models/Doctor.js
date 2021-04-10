const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Doctor = sequelize.define('Doctor',{
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
        specialization: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        is_verified: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue : "false"
        }
    },{
        timestamps : true,
        associate : models => {
            Doctor.belongsTo (models.Medical_practitioner, {
                foreignKey: { name: 'medical_practitioner_id', allowNull: false },
            });
            Doctor.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Doctor.belongsTo (models.Department, {
                foreignKey: { name: 'department_id', allowNull: false },
            });
            Doctor.hasMany(models.Medical_history, {
                foreignKey: { name: 'doctor_id', allowNull: false }
            });
            Doctor.hasMany(models.Hospital_doctor_department, {
                foreignKey: { name: 'doctor_id', allowNull: false }
            });
            Doctor.hasMany(models.Hospital_doctor_shift, {
                foreignKey: { name: 'doctor_id', allowNull: false }
            });
            Doctor.hasMany(models.Emergency_logs, {
                foreignKey: { name: 'doctor_id', allowNull: false }
            });



        }
    });
    return Doctor ;
};
