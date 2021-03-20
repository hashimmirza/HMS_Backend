const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Floor = sequelize.define('Floor',{
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
            Floor.belongsTo (models.Building, {
                foreignKey: { name: 'building_id', allowNull: false },
            });
            Floor.hasMany(models.Ward, {
                foreignKey: { name: 'floor_id', allowNull: false }
            });
        }
    });
    return Floor ;
};
