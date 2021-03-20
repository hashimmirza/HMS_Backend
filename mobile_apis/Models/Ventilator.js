const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Ventilator = sequelize.define('Ventilator',{
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
            Ventilator.belongsTo (models.Room, {
                foreignKey: { name: 'room_id', allowNull: false },
            });
        }
    });
    return Ventilator ;
};
