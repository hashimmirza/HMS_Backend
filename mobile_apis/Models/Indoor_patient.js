const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Indoor_patient = sequelize.define('Indoor_patient',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        diesease: {
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
            Indoor_patient.belongsTo (models.Patient, {
                foreignKey: { name: 'patient_id', allowNull: false },
            });
            Indoor_patient.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Indoor_patient.belongsTo (models.Ward, {
                foreignKey: { name: 'ward_id', allowNull: false },
            });
            Indoor_patient.belongsTo (models.Room, {
                foreignKey: { name: 'room_id', allowNull: false },
            });
            Indoor_patient.belongsTo (models.Medical_history, {
                foreignKey: { name: 'history_id', allowNull: false },
            });

        }
    });
    return Indoor_patient ;
};
