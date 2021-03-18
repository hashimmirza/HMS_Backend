let async = require('async'),
    Sequelize = require('sequelize'),
    Op = Sequelize.Op,
    glob = require('glob'),
    path = require('path'),
    cls = require('continuation-local-storage'),
    db = {},
    rootPath = path.normalize(__dirname + '/../');

let namespace = cls.createNamespace('pantryApp-namespace');

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};
let dbpass =process.env.database_password;
if( dbpass === 'null'){dbpass = null }

let sequelize = new Sequelize(process.env.database_name, process.env.database_username, dbpass, {
    host: process.env.mysql_host,
    port: "3306",
    dialect:'mysql',
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        deletedAt: 'destroyTime',
        paranoid: true
    },
    logging: false,
    operatorsAliases: operatorsAliases,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// load all models
glob('mobile_apis/Models/*.js', (err, files) => {
    console.info('Models are loading ...');
    let model;
    async.forEach(files, (file, cb) => {
        console.log(file);
        model = sequelize.import(path.join(rootPath, file));
        db[model.name] = model;
        cb();
    }, err => {
        Object.keys(db).forEach(modelName => {
            if (db[modelName].options.hasOwnProperty('associate')) {
                db[modelName].options.associate(db)
            }
        });

        let FORCE_DB_SYNC = false;
        sequelize.sync({ force: FORCE_DB_SYNC }).then(() => {
            sequelize.authenticate().then(() => {
                console.info('Sequilize connection has been established ......');
            }).catch(err => {
                console.log('Unable to connect to the database:', err);
            });
        });
    });
});

module.exports = {
    sequelize,
    db
};