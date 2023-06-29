const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
server.use(express.json());

const db = require("./models");

var corsOptions = {
  origin: "http://localhost:3000"
};

server.use(cors(corsOptions));

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
});

//routes
require('./routes/auth')(server);
require('./routes/note')(server);

server.get("/", (req, res) => {
  res.json({ message: "note-manager-api server running." });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});