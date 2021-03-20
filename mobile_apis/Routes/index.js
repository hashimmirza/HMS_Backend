const express = require('express');
const authenticationRoutes = require('./authentication');
const hospitalRoutes = require('./hospital');

const routes = express.Router();

routes.use('/auth', authenticationRoutes);
routes.use('/hospital', hospitalRoutes);

module.exports = routes;
