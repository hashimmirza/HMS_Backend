const Sequelize = require('sequelize');
const db = require('../../config/sequelize');

const Product = Sequelize.Model ;
module.exports = (sequelize, DataTypes) => {
    let Product = sequelize.define('Product', {

        // attributes
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        amazon_item_id :{
            type: Sequelize.STRING,
            defaultValue : null
        } ,
        clone_id: {
            type: Sequelize.INTEGER,
            defaultValue : null
        },
        master_id: {
        type: Sequelize.INTEGER,
            defaultValue : null
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: Sequelize.ENUM,
            values: ['false', 'true'],
            defaultValue : "false"
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        purchase_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rating: {
            type: Sequelize.DOUBLE,
            defaultValue : 0.00,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
        {
            timestamps : true,
            associate: models => {
            // Product.belongsTo (models.User, {
            //     foreignKey: { name: 'user_id', allowNull: true },
            // });
            // Product.hasMany(models.Experience, {
            //     foreignKey: { name: 'product_id', allowNull: true }
            // });
            // Product.hasMany(models.Group_products, {
            //     foreignKey: { name: 'product_id', allowNull: true },
            // });
            // Product.hasMany(models.Sub_category_product, {
            //     foreignKey: { name: 'product_id', allowNull: true },
            // });
            // Product.hasMany(models.Product_picture, {
            //     foreignKey: { name: 'product_id', allowNull: true },
            // });
            // Product.hasMany(models.Product_tags, {
            //     foreignKey: { name: 'product_id', allowNull: true },
            // });
            // Product.hasMany(models.Product_lifestyle_tags, {
            //     foreignKey: { name: 'product_id', allowNull: true }
            // });
            // Product.hasMany(models.Activities, {
            //     foreignKey: { name: 'product_id', allowNull: true }
            // });
            // Product.hasMany(models.Trend_logs, {
            //     foreignKey: { name: 'product_id', allowNull: true },
            // });
            // Product.hasMany(models.Trending_products, {
            //     foreignKey: { name: 'product_id', allowNull: true },
            // });
        }
    });

    return Product;

}

