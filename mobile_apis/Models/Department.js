const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Department = sequelize.define('Department',{
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
            Department.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Department.hasMany(models.Doctor, {
                foreignKey: { name: 'department_id', allowNull: false }
            });
            Department.hasMany(models.Hospital_doctor_department, {
                foreignKey: { name: 'department_id', allowNull: false }
            });
            Department.hasMany(models.Hospital_nurse_department, {
                foreignKey: { name: 'department_id', allowNull: false }
            });
        }
    });
    return Department ;
};
