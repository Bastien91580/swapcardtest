var db = require("../database/dataBaseConnexion");

var objChannel = require("../objects/channel");

module.exports = {
    createChannel: function(name, id) {
        return new Promise((resolve, reject) =>{
            db.query("INSERT INTO channel (name, idOwner) VALUES ('" + name + "' , '" + id + "')", function (err, result, fields) {
                if (err) reject(err);
                db.query("SELECT * FROM channel WHERE id = " + result.insertId + "", function (err, result, fields) {
                    if (err) reject(err);
                    var returnData = [];
                    returnData.push(new objChannel(result[0].id, result[0].name, result[0].idOwner));
                    resolve(returnData);
                });
            });
        });
    },
    
    selectChannel: function() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM channel", function (err, result, fields) {
                if (err) reject(err);
                var returnData = [];
                if(result) {
                    result.forEach(channel => {
                        returnData.push(new objChannel(channel.content, channel.idUser, channel.date));
                    });
                }
                resolve(returnData);
            });
        });
    },

    selectChannelById: function(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM channel WHERE id = " + id, function (err, result, fields) {
                if (err) reject(err);
                var returnData = [];
                returnData.push(new objChannel(result[0].id, result[0].name, result[0].idOwner));
                resolve(returnData);
            });
        });
    },

    deleteChannel: function(id, idUser) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM channel WHERE id = " + id + " AND idOwner = " + idUser, function (err, result, fields) {
                if (err) reject(err);
                if(result.affectedRows == 1) resolve(true);
                else resolve(false);
            });
        });
    },
}