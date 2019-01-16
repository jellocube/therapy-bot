const Discord = require('discord.js');
const meditations = require('../../data/replies/meditations.json');

module.exports = (client, message, args) => {
	console.log('Log', 'Someone needs a breather...');
	let breathMeditations = meditations.breath;
	let randomChoice = Math.floor((Math.random() * breathMeditations.length ) );
	message.channel.send(breathMeditations[randomChoice] + "\n" + "https://m.imgur.com/gallery/RSoEEL0")
};