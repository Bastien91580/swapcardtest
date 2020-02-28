var mysql = require('mysql');

var connnexion = mysql.createConnection({
  host: "localhost",
  user: "swapcard",
  password: "iLikeTrain",
  database: "swapcard",
  port: 8889
});

connnexion.connect(function(err) {
  if (err) throw err;
});

module.exports = connnexion;