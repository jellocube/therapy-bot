const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const introductions = require('../features/moderation/introductions.js');
const callLog = require('../functions/callLog.js');
const guildUtils = require('../functions/guildUtils.js')

module.exports = {
	send: function(client, message) {
		callLog.messageSend(message);

		if(message.author.bot) return;
	
		// if message is sent in #introductions channel, register them via introductions.js
		introChannel = guildUtils.getChannelByKey(message.guild, "introductions");
		if (guildUtils.checkGuildModstate == false) {
			return console.log("Not a moderator here.")
		} else if (message.channel == introChannel) {
			console.log(`${message.author.name} has written in the introductions channel on ${message.guild.name}`);
			introductions.registerIntroduction(message.member);
			return
		};

		// check if first index of string is the specified command prefix
		let prefixLength = 0;

		if (message.content.indexOf(client.config.prefix1[0]) !== 0) {
			if (message.content.indexOf(client.config.prefix2[0]) !== 0 ) {		// this bot supports two different prefixes
				return; 
				};
		};
		
		if (message.content[0] == client.config.prefix1[0]) {		// this bot supports two different prefixes
			prefixLength = client.config.prefix1.length;
			console.log("using prefix 1")
		} else if (message.content[0] == client.config.prefix2[0]) {
			prefixLength = client.config.prefix2.length;
			console.log("using prefix 2")
		};
	
		//magic formula to reformat message into command-argument array
		const args = message.content.slice(prefixLength).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
	
		if (client.commands.has(command)) {
			client.commands.get(command)(client, message, args);
			return;
		};
	},

	deleted: function(client, message) {
		callLog.messageDeleted(message);
	},

	updated: function(client, oldMessage, newMessage) {
		callLog.messageEdited(oldMessage, newMessage)
	}

}
