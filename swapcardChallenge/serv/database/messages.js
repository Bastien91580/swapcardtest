var db = require("../database/dataBaseConnexion");
var objMessage = require("../objects/message")

module.exports = {
    createMessage: function(idChannel, content, idUser, date) {
        return new Promise((resolve, reject) =>{
            db.query("INSERT INTO message (idChannel, content, idUser, date) VALUES (" + idChannel + ", '" + content + "', " + idUser + ", '" + date + "')", function (err, result, fields) {
                if (err) throw err;
                db.query("SELECT * FROM message WHERE id = " + result.insertId + "", function (err, result, fields) {
                    if (err) reject(err);
                    var returnData = [];
                    returnData.push(new objMessage(result[0].id, result[0].content, result[0].idUser, result[0].date));
                    resolve(returnData);
                });
            });
        });
    },
    
    selectMessage: function(idChannel) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM message WHERE idChannel = " + idChannel + " ORDER BY date", function (err, result, fields) {
                if (err) throw err;
                var returnData = [];
                if(result) {
                    result.forEach(message => {
                        returnData.push(new objMessage(message.id, message.content, message.idUser, message.date));
                    });
                }
                resolve(returnData);
            });
        });
    },

    deleteAllMessageFromChannel: function(idChannel) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM message WHERE idChannel = " + idChannel, function (err, result, fields) {
                if (err) throw err;
                var returnData = [];
                if(result.warningCount == 0) resolve(true);
                else reject(false);
            });
        });
    },
}