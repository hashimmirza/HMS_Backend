const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Technician = sequelize.define('Technician',{
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
            Technician.belongsTo (models.User, {
                foreignKey: { name: 'user_id', allowNull: false },
            });
            Technician.belongsTo (models.Ward, {
                foreignKey: { name: 'ward_id', allowNull: false },
            });
        }
    });
    return Technician ;
};
