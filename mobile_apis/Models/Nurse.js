const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Nurse = sequelize.define('Nurse',{
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
        is_verified: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue : "false"
        }
    },{
        timestamps : true,
        associate : models => {
            Nurse.belongsTo (models.Medical_practitioner, {
                foreignKey: { name: 'medical_practitioner_id', allowNull: false },
            });
            Nurse.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Nurse.hasMany(models.Hospital_nurse_shift, {
                foreignKey: { name: 'nurse_id', allowNull: false }
            });
            Nurse.hasMany(models.Hospital_nurse_department, {
                foreignKey: { name: 'nurse_id', allowNull: false }
            });
            Nurse.hasMany(models.Emergency_logs, {
                foreignKey: { name: 'nurse_id', allowNull: false }
            });

        }
    });
    return Nurse ;
};
