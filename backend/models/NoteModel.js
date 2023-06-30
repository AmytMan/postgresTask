const { DataTypes } = require("sequelize");
const sequelize = require("../connectToDb");

const Note = sequelize.define(
  "Note",
  {
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorSpeciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    noteDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const patient = sequelize.define(
  "patient",
  {
    patientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Note.hasMany(patient, {
  foreignKey: "noteId",
});
patient.belongsTo(Note, {
  foreignKey: "noteId",
});

sequelize
  .sync()
  .then(() => {
    console.log("Tables and models are synced together");
  })
  .catch((error) => {
    console.error("Error syncing models and tables:", error);
  });

module.exports = { Note, patient };
