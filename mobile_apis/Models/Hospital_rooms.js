const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Hospital_rooms = sequelize.define('Hospital_rooms',{
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
            Hospital_rooms.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Hospital_rooms.belongsTo (models.Room, {
                foreignKey: { name: 'room_id', allowNull: false },
            });
        }
    });
    return Hospital_rooms ;
};
