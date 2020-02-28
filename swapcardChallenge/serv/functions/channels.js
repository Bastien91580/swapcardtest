var dbChannel = require("../database/channels");
var dbUser = require("../database/users");
var dbMember = require("../database/member");
var dbMessage = require("../database/messages");


module.exports = {
    createChannel: function(name, token) {
        return new Promise((resolve, reject) =>{
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {
                    dbChannel.createChannel(name, idUser)
                    .then(newChannel => {
                        
                        dbMember.createMember(idUser, newChannel[0].id)
                        .then(idLink => {
                            if(idLink > 0) resolve(newChannel);
                            else reject("Error create link between User and Channel")
                        })
                        .catch(error => {
                            reject(error);
                        });
                        
                    })
                    .catch(error => {
                        reject(error);
                    });

                } 
                else reject("Error token");
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    
    getListOfChannel: function(token) {
        return new Promise((resolve, reject) => {
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {
                    dbMember.selectChannelOfMember(idUser)
                    .then(listeIdChannel => {
                        var numberOfChannel = listeIdChannel.length;
                        var acutalChannel = 0;
                        var returnData = [];
                        listeIdChannel.forEach(idChannel => {
                            dbChannel.selectChannelById(idChannel)
                            .then(channel => {
                                returnData.push(channel);
                                acutalChannel ++;
                                if(acutalChannel == numberOfChannel) resolve(returnData);
                            })
                            .catch( error => {
                                reject(error);
                            });
                        })
                    })
                    .catch( error => {
                        reject(error);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    deleteChannel: function(id, token) {
        return new Promise((resolve, reject) => {
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {

                    dbChannel.deleteChannel(id, idUser)
                    .then(resultChannel => {
                        if(resultChannel == true){
                            dbMessage.deleteAllMessageFromChannel(id)
                            .then(resultMessage => {
                                if(resultMessage){
                                    resolve(resultMessage);
                                } else reject("Error delete message from channel");
                            })
                            .catch(error => {
                                reject(error);
                            });
                        }
                        else reject("The channel doesn't existe or you don't have the rigth to delete it");
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