const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: "http://localhost:4001"
};

server.use(cors(corsOptions));

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.json({ message: "note-manager-api server running." });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});