const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Hospital_doctor_department = sequelize.define('Hospital_doctor_department',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        }
    },{
        timestamps : true,
        associate : models => {
            Hospital_doctor_department.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Hospital_doctor_department.belongsTo (models.Doctor, {
                foreignKey: { name: 'doctor_id', allowNull: false },
            });
            Hospital_doctor_department.belongsTo (models.Department, {
                foreignKey: { name: 'department_id', allowNull: false },
            });
        }
    });
    return Hospital_doctor_department ;
};
