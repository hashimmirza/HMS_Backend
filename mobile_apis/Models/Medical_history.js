const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Medical_history = sequelize.define('Medical_history',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        disease: {
            type: Sequelize.STRING,
        },
        condition: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        type :{
            type: Sequelize.STRING,
            defaultValue : null
        }
    },{
        timestamps : true,
        associate : models => {
            Medical_history.belongsTo (models.Patient, {
                foreignKey: { name: 'patient_id', allowNull: false },
            });
            Medical_history.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Medical_history.belongsTo (models.Doctor, {
                foreignKey: { name: 'doctor_id', allowNull: false },
            });
            Medical_history.hasMany(models.Indoor_patient, {
                foreignKey: { name: 'history_id', allowNull: false }
            });
        }
    });
    return Medical_history ;
};
