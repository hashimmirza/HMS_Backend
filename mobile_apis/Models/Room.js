const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Room = sequelize.define('Room',{
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
            Room.belongsTo (models.Ward, {
                foreignKey: { name: 'ward_id', allowNull: false },
            });
            Room.hasMany(models.Bed, {
                foreignKey: { name: 'room_id', allowNull: false }
            });
            Room.hasMany(models.Ventilator, {
                foreignKey: { name: 'room_id', allowNull: false }
            });
            Room.hasMany(models.Machine, {
                foreignKey: { name: 'room_id', allowNull: false }
            });
            Room.hasMany(models.Indoor_patient, {
                foreignKey: { name: 'room_id', allowNull: false }
            });
        }
    });
    return Room ;
};
