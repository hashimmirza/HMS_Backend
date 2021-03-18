const express = require('express');
const authenticationRoutes = require('./authentication');

const routes = express.Router();

routes.use('/auth', authenticationRoutes);

module.exports = routes;
