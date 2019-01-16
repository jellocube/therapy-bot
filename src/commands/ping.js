const Discord = require('discord.js');

module.exports = (client, message, args) => {
	console.log(`Log: ${message.guild.nameAcronym}: ping from: ${message.author.tag}`);
	message.channel.send(`Ponging in progress...`).then((msg) => {
		// fancy pong that first sends message, then shows latency time in message
		console.log(`Log: ${message.guild.nameAcronym}: pong latency: ${msg.createdTimestamp - message.createdTimestamp}`);
		msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
	});
};
