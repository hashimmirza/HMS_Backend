
/*
    Programmer: Muhammad Hashim
    Description: The purpose of this Project is to write the Api's for HMS
    Date : 12 March 2021
*/

// required lib
const dotenv = require('dotenv');
dotenv.config();
const express  = require ('express');
const apiRoutes = require('./mobile_apis/Routes');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const cors = require('cors');
const cache = require('memory-cache');
const db = require('./config/sequelize').db ;
const Sequelize = require('sequelize');
var morgan = require('morgan');
const app = express();
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));

app.use(cors({credentials: true , origin: ['http://localhost:3000'] }));

const serveIndex = require('serve-index');
const port = process.env.PORT ;
let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent){
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send;
            res.send = (body) => {
                memCache.put(key,body,duration*1000);
                res.sendResponse(body)
            }
            next()
        }
    }
};

// View engine setup
app.engine('html', cons.swig);
app.set('views','Views');
app.set('view engine', 'html');

// support json encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize routes
app.use('/api', apiRoutes);
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'),
    serveIndex('uploads', {'icons': true}));

// start server
app.listen(port , () => {
    console.log("we are live at " + port);
});

// run cron job
require('./mobile_apis/Services/Cron_job')

// test api
app.get('/api/test' ,cacheMiddleware(30),function(req, res){
    res.send("hashim");
});
module.exports = app;
