const Discord = require('discord.js');
const help = require('../features/help.js');

module.exports = (client, message, args) => {
	console.log('Log', 'Someone needs help...');
	return help.sendDirectMessageHelp(message.author, message.guild, message.channel);
};
