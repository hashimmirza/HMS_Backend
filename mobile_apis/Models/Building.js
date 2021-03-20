const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Building = sequelize.define('Building',{
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
            Building.belongsTo (models.Branch, {
                foreignKey: { name: 'branch_id', allowNull: false },
            });
            Building.hasMany(models.Floor, {
                foreignKey: { name: 'building_id', allowNull: false }
            });
        }
    });
    return Building ;
};
