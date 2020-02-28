var db = require("../database/dataBaseConnexion");

var objUser = require("../objects/user");

module.exports = {
    createUser: function(pseudo, mail, password, token) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO user (pseudo, mail, password, token) VALUES ('" + pseudo + "' , '" + mail + "', '" + password + "', '" + token + "')", function (err, result, fields) {
                if (err) reject(err);
                db.query("SELECT * FROM user WHERE mail = '" + mail + "'", function (err, result, fields) {
                    if (err) reject(err);
                    var returnData = new objUser(result[0].id, result[0].pseudo, result[0].mail);
                    resolve(returnData);
                });
            });
        });
    },

    selectUser: function(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE id = " + id, function (err, result, fields) {
                if (err) reject(err);
                var returnData = [];
                if(result) {
                    result.forEach(user => {
                        returnData.push(new objUser(user.id, user.pseudo, user.mail));
                    });
                }
                resolve(returnData);
            });
        });
    },

    findPseudoOrMail: function(pseudo, mail) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE pseudo = '" + pseudo + "' OR mail = '" + mail + "'", function (err, result, fields) {
                if (err) reject(err);
                if(result.length > 0) resolve(true);
                else resolve(false);
            });
        });
    },
    
    login: function(mail, password) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE mail = '" + mail + "' AND password = '" + password + "'", function (err, result, fields) {
                if (err) reject(err);
                if(result.length > 0) resolve(result[0].token);
                else reject("Mail and Password combinaison not correct");
            });
        });
    },

    getIdWithToken: function(token) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE token = '" + token + "'", function (err, result, fields) {
                if (err) reject(err);
                if(result.length > 0) resolve(result[0].id);
                else reject("User Not found");
            });
        });
    },
    
}