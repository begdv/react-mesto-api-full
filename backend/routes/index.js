const routes = require('express').Router();

routes.use('/users', require('./users'));

routes.use('/cards', require('./cards'));

module.exports = routes;
