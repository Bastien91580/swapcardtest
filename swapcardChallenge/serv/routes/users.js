var express = require('express');
var router = express.Router();
var validator = require("email-validator");

var fctUser = require("../functions/users");
var fctMember = require("../functions/member")

router.post('/invite', function(req, res, next) {
  var idInvite = req.body.idInvite;
  var idChannel = req.body.idChannel;
  var token = req.session.token;

  if(idInvite, idChannel, token) {
    fctMember.invite(idInvite, idChannel, token)
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch( error => {
      res.status(500).send('Error : ' + error);
    });
  }
});

router.delete('/kick', function(req, res, next) {
  var idInvite = req.body.idInvite;
  var idChannel = req.body.idChannel;
  var token = req.session.token;

  if(idInvite, idChannel, token) {
    fctMember.kick(idInvite, idChannel, token)
    .then(result => {
      res.status(200).send(result);
    })
    .catch( error => {
      res.status(500).send('Error : ' + error);
    });
  }
});

router.post('/', function(req, res, next) {
  var pseudo = req.body.pseudo;
  var mail = req.body.mail;
  var password = req.body.password;

  if(pseudo && mail && password && validator.validate(mail)) {
    fctUser.createUser(pseudo, mail, password)
    .then(result => {
      res.status(200).send(result);
    })
    .catch( error => {
      res.status(500).send('Error : ' + error);
    });
  }
});

module.exports = router;
