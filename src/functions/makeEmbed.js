const guildUtils = require('./guildUtils.js')

module.exports = {      // these are the different log/embed templates and sends that are called via other functions
	log1Field: function(guild, color, title, message) {   
        logchan = guildUtils.getChannelByKey(guild, "logs");
        logchan.send({embed: {
            color: color,
            // author: {
            //   name: client.user.username,
            //   icon_url: client.user.avatarURL
            // },
            title: title,
            // url: "http://google.com",
            description: message,
            timestamp: new Date()
            }
        })
    },

    log3Field: function(guild, color, title, message, title1, logMessage1, title2, logMessage2) { 
        logchan = guildUtils.getChannelByKey(guild, "logs");
        logchan.send({embed: {
            color: color,
            title: title,
            description: message,

            fields: [{
                name: title1,
                value: logMessage1
              },
              {
                name: title2,
                value: logMessage2
              }
            ],
            
            timestamp: new Date()
            }
        })
    },

    embed1Field: function(client, color, title, message, callingMessage) {
        replyChannel = callingMessage.channel;
        replyChannel.send({embed: {
            color: color,
            title: title,
            description: message,
            }
        })
    },

    embedImg1Field: function(client, color, title, message, imageURL, callingMessage) { 
        replyChannel = callingMessage.channel;
        replyChannel.send({embed: {
            color: color,
            title: title,
            image:{url: imageURL},
            description: message,
            }
        })
    },

    embed3Field: function(client, color, title, message, title1, logMessage1, title2, logMessage2, callingMessage) { 
        replyChannel = callingMessage.channel;
        replyChannel.send({embed: {
            color: color,
            title: title,
            description: message,

            fields: [{
                name: title1,
                value: logMessage1
              },
              {
                name: title2,
                value: logMessage2
              }
            ],
            
            }
        })
    },

    embedImg3Field: function(client, color, title, message, title1, logMessage1, title2, logMessage2, imageURL, callingMessage) { 
        replyChannel = callingMessage.channel;
        replyChannel.send({embed: {
            color: color,
            title: title,
            description: message,
            image:{url: imageURL},

            fields: [{
                name: title1,
                value: logMessage1
              },
              {
                name: title2,
                value: logMessage2
              }
            ],
            
            }
        })
    },

    library1Field: function(color, title, message, callingMessage) {
        replyChannel = callingMessage.channel;
        replyChannel.send({embed: {
            color: color,
            title: title,
            description: message,
            thumbnail: {url: "https://i.imgur.com/brI0tVl.png"},
            }
        })
    },

    library3Fields: function(color, title, message, title1, logMessage1, title2, logMessage2, callingMessage) {
        replyChannel = callingMessage.channel;
        replyChannel.send({embed: {
            color: color,
            title: title,
            description: message,
            thumbnail: {url: "https://i.imgur.com/brI0tVl.png"},
            fields: [{
                name: title1,
                value: logMessage1
              },
              {
                name: title2,
                value: logMessage2
              }
            ],
            
            }
        })
    }
}