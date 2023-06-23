const db = require("../models");
const config = require("../configuration/secret");
const Note = db.note;
const Op = db.Sequelize.Op;

exports.postnote = (req, res) => {
  Note.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(() => {
      res.send({ message: "note post successfull." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getallnotes = (req, res) => {
    Note.findAll()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  };
  


