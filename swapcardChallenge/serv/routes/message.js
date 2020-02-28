var express = require('express');
var router = express.Router();

var fctChannel = require("../functions/channels");
var fctMessage = require("../functions/messages")

router.post('/', function(req, res, next) {
  var content = req.body.content;
  var idChannel = req.body.idChannel;
  var token = req.session.token;

  if(content && idChannel) {
    fctMessage.createMessage(idChannel, content, token)
    .then(result => {
      res.status(200).send(result);
    })
    .catch( error => {
      res.status(500).send('Error : ' + error);
    });
  } else res.status(500).send("Parameters Missing");
});


module.exports = router;
