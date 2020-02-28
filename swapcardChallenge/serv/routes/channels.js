var express = require('express');
var router = express.Router();

var fctChannel = require("../functions/channels");
var fctMessage = require("../functions/messages")

router.get('/', function(req, res, next) {
  var token = req.session.token;

  fctChannel.getListOfChannel(token)
  .then(result => {
    res.status(200).send(result);
  })
  .catch( error => {
    res.status(500).send('Error : ' + error);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var token = req.session.token;

  fctMessage.getMessagesOfChannel(id, token)
  .then(result => {
    res.status(200).send(result);
  })
  .catch( error => {
    res.status(500).send('Error : ' + error);
  });
});

router.post('/', function(req, res, next) {
  var name = req.body.name;
  var token = req.session.token;

  if(name) {
    fctChannel.createChannel(name, token)
    .then(result => {
      res.status(200).send(result);
    })
    .catch( error => {
      res.status(500).send('Error : ' + error);
    });
  } else res.status(500).send("Parameters Missing");
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  var token = req.session.token;

  fctChannel.deleteChannel(id, token)
  .then(result => {
    res.status(200).send(result);
  })
  .catch( error => {
    res.status(500).send('Error : ' + error);
  });
});

module.exports = router;
