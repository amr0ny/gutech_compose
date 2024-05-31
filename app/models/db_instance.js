const { Sequelize } = require('sequelize');
var config = require('../config')();

const sequelize = new Sequelize({
    database: config.sequelize.database,
    username: config.sequelize.username,
    password: config.sequelize.password,
    host: config.sequelize.host,
    dialect: config.sequelize.dialect,
  });  

module.exports = sequelize;