const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Ward = sequelize.define('Ward',{
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
            Ward.belongsTo (models.Floor, {
                foreignKey: { name: 'floor_id', allowNull: false },
            });
            Ward.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Ward.hasMany(models.Room, {
                foreignKey: { name: 'ward_id', allowNull: false }
            });
            Ward.hasMany(models.Technician, {
                foreignKey: { name: 'ward_id', allowNull: false }
            });
            Ward.hasMany(models.Medical_practitioner, {
                foreignKey: { name: 'ward_id', allowNull: false }
            });
            Ward.hasMany(models.Indoor_patient, {
                foreignKey: { name: 'ward_id', allowNull: false }
            });
        }
    });
    return Ward ;
};
