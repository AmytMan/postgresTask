const express = require("express");
const app = express();
const sequelize = require("./connectToDb");
const router = require("./routes/web.js");
const bodyParser = require("body-parser");
const cors = require("cors");

sequelize
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Error", err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
