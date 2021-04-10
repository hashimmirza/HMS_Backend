const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {

    let Hospital_nurse_department = sequelize.define('Hospital_nurse_department',{
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
            Hospital_nurse_department.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Hospital_nurse_department.belongsTo (models.Nurse, {
                foreignKey: { name: 'nurse_id', allowNull: false },
            });
            Hospital_nurse_department.belongsTo (models.Department, {
                foreignKey: { name: 'department_id', allowNull: false },
            });
        }
    });
    return Hospital_nurse_department ;
};
