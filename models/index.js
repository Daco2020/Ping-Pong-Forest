const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Ping = require('./ping');

const sequelize = new
Sequelize(config.database, config.username, config.password, config)
db.sequelize = sequelize;

db.Ping = Ping;

Ping.init(sequelize);
Ping.associate(db);
module.exports = db;
