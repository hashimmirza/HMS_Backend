const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Branch = sequelize.define('Branch',{
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
            Branch.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Branch.hasMany(models.Building, {
                foreignKey: { name: 'branch_id', allowNull: false }
            });
            // User.hasMany(models.Followers, {
            //     as: 'Follower',
            //     foreignKey: {
            //         name: 'follower_id',
            //         allowNull: true }
            // });
            //
            // User.hasMany(models.Followers, {
            //     as: 'Followee',
            //     foreignKey: {
            //         name: 'following_id',
            //         allowNull: true }
            // });
            //
            // User.hasMany(models.Trend_logs, {
            //     as: 'p_user',
            //     foreignKey: {
            //         name: 'user_id',
            //         allowNull: true }
            // });
            //
            // User.hasMany(models.Trend_logs, {
            //     as: 'pantry',
            //     foreignKey: {
            //         name: 'pantry_id',
            //         allowNull: true }
            // });
            // User.hasMany(models.Activities, {
            //     foreignKey: {
            //         name: 'username_id',
            //         allowNull: true }
            // });
            // User.hasMany(models.Activities, {
            //     as: 'user',
            //     foreignKey: {
            //         name: 'user_id',
            //         allowNull: true }
            // });
            // User.hasMany(models.Notifications, {
            //     foreignKey: {name: 'user_id'}
            // });
            // User.hasMany(models.Experience, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
            // User.hasMany(models.Group, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
            // User.hasMany(models.Product_tags, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
            // User.hasMany(models.User_lifestyle_tags, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
            // User.hasMany(models.User_devices, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
            // User.hasMany(models.Trending_pantries, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
            // User.hasMany(models.User_Account_Tags , {
            //     foreignKey: { name: 'account_tag_id', allowNull: false },
            // });
            // User.hasMany(models.User_Searches , {
            //     foreignKey: { name: 'user_id', allowNull: false },
            // });
        }
    });
    return Branch ;
};
