const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Patient = sequelize.define('Patient',{
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
        }
    },{
        timestamps : true,
        associate : models => {
            Patient.belongsTo (models.User, {
                foreignKey: { name: 'user_id', allowNull: false },
            });
            Patient.hasMany(models.Indoor_patient, {
                foreignKey: { name: 'patient_id', allowNull: false }
            });
            Patient.hasMany(models.Assistant_Doc_Patient, {
                foreignKey: { name: 'patient_id', allowNull: false }
            });

        }
    });
    return Patient ;
};
