const db = require("../models");
const config = require("../configuration/secret");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(() => {
        res.send({ message: "User was registered successfully!" });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
  // Find user
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 43200 // 12 hours
      });
      
      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};