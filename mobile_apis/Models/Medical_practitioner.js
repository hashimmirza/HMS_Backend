const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Medical_practitioner = sequelize.define('Medical_practitioner',{
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
        type: {
            type: Sequelize.STRING,
            defaultValue : null
        }
    },{
        timestamps : true,
        associate : models => {
            Medical_practitioner.belongsTo (models.User, {
                foreignKey: { name: 'user_id', allowNull: false },
            });
            Medical_practitioner.belongsTo (models.Ward, {
                foreignKey: { name: 'ward_id', allowNull: false },
            });
            Medical_practitioner.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Medical_practitioner.hasMany(models.Doctor, {
                foreignKey: { name: 'medical_practitioner_id', allowNull: false }
            });
            Medical_practitioner.hasMany(models.Nurse, {
                foreignKey: { name: 'medical_practitioner_id', allowNull: false }
            });
            Medical_practitioner.hasMany(models.Assistant_doctor, {
                foreignKey: { name: 'medical_practitioner_id', allowNull: false }
            });
        }
    });
    return Medical_practitioner ;
};
