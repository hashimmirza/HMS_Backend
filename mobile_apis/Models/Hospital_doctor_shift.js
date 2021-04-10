const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Hospital_doctor_shift = sequelize.define('Hospital_doctor_shift',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        shift: {
            type: Sequelize.STRING,
            defaultValue : null
        }
    },{
        timestamps : true,
        associate : models => {
            Hospital_doctor_shift.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Hospital_doctor_shift.belongsTo (models.Doctor, {
                foreignKey: { name: 'doctor_id', allowNull: false },
            });
        }
    });
    return Hospital_doctor_shift ;
};
