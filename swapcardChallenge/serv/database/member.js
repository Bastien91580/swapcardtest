var db = require("./dataBaseConnexion");

module.exports = {
    createMember: function(idUser, idChannel) {
        return new Promise((resolve, reject) =>{
            db.query("INSERT INTO member (idUser, idChannel) VALUES (" + idUser + ", " + idChannel + ")", function (err, result, fields) {
                if (err) reject(err);
                resolve(result.insertId);
            });
        });
    },
    
    selectChannelOfMember: function(idUser) {
        return new Promise((resolve, reject) => {
            db.query("SELECT idChannel FROM member WHERE idUser = " + idUser, function (err, result, fields) {
                if (err) reject(err);
                var returnData = [];
                if(result) {
                    result.forEach(ids => {
                        returnData.push(ids.idChannel);
                    });
                }
                resolve(returnData);
            });
        });
    },

    isThisAMember: function(idUser, idChannel) {
        return new Promise((resolve, reject) => {
            db.query("SELECT idChannel FROM member WHERE idUser = " + idUser + " AND  idChannel = " + idChannel, function (err, result, fields) {
                if (err) reject(err);
                if(result) {
                    resolve(true);
                }
                else reject("Your are not a member of this channel");
            });
        });
    },

    deleteMember: function(idUser, idChannel) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM member WHERE idUser = " + idUser + " AND  idChannel = " + idChannel, function (err, result, fields) {
                if (err) reject(err);
                if(result.affectedRows == 1) resolve(true);
                else resolve(false);
            });
        });
    },
     
}