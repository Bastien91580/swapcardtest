var dbMember = require("../database/member")
var dbMessage = require("../database/messages")
var dbUser = require("../database/users")

module.exports = {
    createMessage: function(idChannel, content, token) {
        return new Promise((resolve, reject) =>{
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {
                    dbMember.isThisAMember(idUser, idChannel)
                    .then(rights => {
                        if(rights){
                            var d = new Date();
                            var y = d.getFullYear()
                            var m = d.getMonth() + 1
                            var day = d.getDate();
                            var h = d.getHours();
                            var min = d.getMinutes();
                            var s = d.getSeconds();
                            var date = y + "-" + m + "-" + day + " " + h + ":" + min + ":" + s;
                            dbMessage.createMessage(idChannel, content, idUser, date)
                            .then(messages => {
                                if(messages) resolve(messages);
                                else reject("No message in this channel");
                            })
                        }
                        else reject("You don't hace rights to see this channel");
                    })
                    .catch(error => {
                        reject(error);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getMessagesOfChannel: function(idChannel, token) {
        return new Promise((resolve, reject) => {
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {

                    dbMember.isThisAMember(idUser, idChannel)
                    .then(rights => {
                        if(rights){
                            dbMessage.selectMessage(idChannel)
                            .then(messages => {
                                if(messages){

                                    var idUserMessages = [];
                                    var names = [];

                                    messages.forEach(message => {
                                        if(idUserMessages.indexOf(message.author) == -1) {
                                            idUserMessages.push(message.author);
                                        }
                                    });

                                    var numberOfUsers = idUserMessages.length;
                                    var actualUser = 0;

                                    idUserMessages.forEach(id => {

                                        dbUser.selectUser(id)
                                        .then(name => {
                                            names.push({pseudo : name[0].pseudo, id : name[0].id});
                                            
                                            actualUser ++;
                                            if(actualUser == numberOfUsers){

                                                messages.forEach(mes => {
                                                    names.forEach(pseudo => {
                                                        if(mes.author == pseudo.id){
                                                            mes.author = pseudo.pseudo;
                                                        }
                                                    });
                                                });
                                                resolve(messages);
                                                
                                            }
                                        })
                                        .catch(error => {
                                            reject(error);
                                        });
                                    });
                                    
                                }
                                else reject("No message in this channel");
                            })
                        }
                        else reject("You don't hace rights to see this channel");
                    })
                    .catch(error => {
                        reject(error);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    },
}


