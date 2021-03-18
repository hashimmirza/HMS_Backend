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
        full_name: {
            type: Sequelize.STRING,
        },
        google_id: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        apple_id: {
            type: Sequelize.STRING,
            defaultValue : null
        },
            amazon_referral_code: {
                type: Sequelize.STRING,
                defaultValue : null
            },

        username: {
            unique : true,
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        secondary_email: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        password: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "pending"
        },
        verification_token: {
            type: Sequelize.STRING,
        },
        is_verified: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue : "false"
        },
        logged_in: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue : "false"
        },
        bio: {
            type: Sequelize.STRING,
            defaultValue : ""
        },
        profile_picture: {
            type: Sequelize.STRING,
        },
        cover_picture: {
            type: Sequelize.STRING,
        },
        website: {
            type: Sequelize.STRING,
        },
        api_key: {
            type: Sequelize.STRING,
        },
        player_id: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        reset_token: {
            type: Sequelize.STRING,
        },
        reset_token_expires : {
            type: Sequelize.DATE,
        }
    }
        ,{
        scopes : {
            withoutPassword : {
                attributes : {
                    exclude : ['password']
                }
            }
        },
        timestamps : true,
        associate : models => {
            // User.hasMany(models.Product, {
            //     foreignKey: { name: 'user_id', allowNull: true }
            // });
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
