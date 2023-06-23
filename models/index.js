const config = require("../configuration/db.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);
db.note = require("../models/note.js")(sequelize, Sequelize);

// Define user to notes relationship
db.user.hasMany(db.note, { as: 'notes', foreignKey: 'userId' });
db.note.belongsTo(db.user, { as: 'user', foreignKey: 'userId' });

module.exports = db;