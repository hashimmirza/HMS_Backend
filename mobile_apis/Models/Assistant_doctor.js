const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Assistant_doctor = sequelize.define('Assistant_doctor',{
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
            Assistant_doctor.belongsTo (models.Medical_practitioner, {
                foreignKey: { name: 'medical_practitioner_id', allowNull: false },
            });
            Assistant_doctor.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
        }
    });
    return Assistant_doctor ;
};
