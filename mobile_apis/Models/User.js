const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define('User',{
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
        gender: {
            type: Sequelize.ENUM,
            values: ['male', 'female','other','not_specified'],
            defaultValue : "not_specified"
        },
        age: {
            type: Sequelize.INTEGER,
            defaultValue : null
        },
        cnic: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        phone_number: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        user_type: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },{
        timestamps : true,
        associate : models => {
            User.hasMany(models.Patient, {
                foreignKey: { name: 'user_id', allowNull: false }
            });
            User.hasMany(models.Technician, {
                foreignKey: { name: 'user_id', allowNull: false }
            });
            User.hasMany(models.Medical_practitioner, {
                foreignKey: { name: 'user_id', allowNull: false }
            });
            User.hasMany(models.Emergency_logs, {
                foreignKey: { name: 'user_id', allowNull: false }
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
    return User ;
};
