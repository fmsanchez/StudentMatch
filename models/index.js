var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
//var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = null;

if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     process.env.PORT,
    host:     process.env.HOST,
    logging:  false,
    dialectOptions: {
      ssl: true
    }
  });
} else {
  sequelize = new Sequelize(undefined, undefined, undefined, {
    dialect: 'sqlite',
    storage: './development.sqlite'
  });
}

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    console.log("yes it is: ", modelName, db[modelName]);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;