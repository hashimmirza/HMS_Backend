const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Hospital_nurse_shift = sequelize.define('Hospital_nurse_shift',{
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
            Hospital_nurse_shift.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Hospital_nurse_shift.belongsTo (models.Nurse, {
                foreignKey: { name: 'nurse_id', allowNull: false },
            });
        }
    });
    return Hospital_nurse_shift ;
};
