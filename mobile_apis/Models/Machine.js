const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Machine = sequelize.define('Machine',{
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
        machine_code: {
        type: Sequelize.STRING,
            defaultValue : null
    },
        maid_in: {
            type: Sequelize.STRING,
            defaultValue : null
        }
    },{
        timestamps : true,
        associate : models => {
            Machine.belongsTo (models.Room, {
                foreignKey: { name: 'room_id', allowNull: false },
            });
        }
    });
    return Machine ;
};
