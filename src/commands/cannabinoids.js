const Discord = require('discord.js');
const safety = require('./safety.js');

module.exports = (client, message, args) => {
	console.log('Log', 'Someone wants to know about cannabinoids...');
	safety(client, message, ["cannabinoids"])
};