var dbMember = require("../database/member");
var dbChannel = require("../database/channels");
var dbUser = require("../database/users");


module.exports = {
    invite: function(idInvite, idChannel, token) {
        return new Promise((resolve, reject) => {
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {
                    dbChannel.selectChannelById(idChannel)
                    .then(channel => {
                        if(idUser == channel[0].owner) {
                            dbMember.createMember(idInvite, idChannel)
                            .then(result => {
                                if(result > 0) resolve(true);
                                else reject(false);
                            })
                            .catch(error => {
                                reject(error);
                            });
                        }
                        else reject("You don't have the right to invite someone");
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
    kick: function(idInvite, idChannel, token) {
        return new Promise((resolve, reject) => {
            dbUser.getIdWithToken(token)
            .then(idUser => {
                if(idUser) {
                    dbChannel.selectChannelById(idChannel)
                    .then(channel => {
                        if(idUser == channel[0].owner) {
                            dbMember.deleteMember(idInvite, idChannel)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(error);
                            });
                        }
                        else reject("You don't have the right to kick someone");
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
    
}


