const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Emergency_logs = sequelize.define('Emergency_logs',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        condition: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        patient_name : {
            type: Sequelize.STRING,
            defaultValue : null
        }
    },{
        timestamps : true,
        associate : models => {
            Emergency_logs.belongsTo (models.User, {
                foreignKey: { name: 'patient_representator_id', allowNull: false },
            });
            Emergency_logs.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Emergency_logs.belongsTo (models.Doctor, {
                foreignKey: { name: 'doctor_id', allowNull: false },
            });
            Emergency_logs.belongsTo (models.Nurse, {
                foreignKey: { name: 'nurse_id', allowNull: false },
            });
        }
    });
    return Emergency_logs ;
};
