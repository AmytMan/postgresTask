const Sequelize = require("sequelize");

const sequelize = new Sequelize("myNotes", "postgres", "Amit123!!", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
