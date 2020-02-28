var dbUser = require("../database/users");

const random128Hex = require('../core/random128.js').random128Hex;
const jwt = require('jwt-simple');
var sha1 = require('sha1');

module.exports = {
    createUser: function(pseudo, mail, password) {
        return new Promise((resolve, reject) => {
            dbUser.findPseudoOrMail(pseudo, mail)
            .then(pseudoAlreadyExist => {
                if(!pseudoAlreadyExist){
                    password = sha1(password + "MoreThanASwapCard");
                    const token = jwt.encode({mail, password}, random128Hex())
                    dbUser.createUser(pseudo, mail, password, token)
                    .then(result => {
                        resolve(result);
                    })
                    .catch( error => {
                        reject(error);
                    });
                } else {
                    reject("Pseudo or Mail Already Used");
                }
            })
            .catch(error => {
                reject(error);
            });
            
        });
    },
    
    login: function(mail, password) {
        return new Promise((resolve, reject) => {
            password = sha1(password + "MoreThanASwapCard");
            dbUser.login(mail, password)
            .then(token => {
                resolve(token);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
}


