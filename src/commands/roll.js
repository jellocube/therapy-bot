const Discord = require('discord.js');
const dice = require('../features/dice.js');

module.exports = (client, message, args) => {
	console.log(`Log: ${message.guild.nameAcronym}: d20 request from: ${message.author.tag} for ${args}.`);

	if (args.length === 0) {
		dice.sendFailMessage(message.channel);
		return
	};

	let diceRoll = dice.rollDice(args.toString(), message.member);
	dice.sendDiceEmbed(diceRoll, message.channel);
};
