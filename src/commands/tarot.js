const Discord = require('discord.js');
const tarot = require('../features/tarot/tarot.js');

module.exports = (client, message, args) => {
	console.log('Log', 'tarot spread requested...');

	if (args.length === 0) {
		return tarot.sendHelpMessage(message.channel);
	};

	if (args[0].toLowerCase() === "spread") {
		const queryNumber = args[3];
		const queryName = args.slice(4).join(' ');
		return tarot.sendTarotSpread(message.channel, args[1], args[2], queryNumber, queryName);
	}
	else if (args[0].toLowerCase() === "card") {
		const deckName = args[1];
		const cardNumber = args[2];
		const cardName = args.slice(3).join(' ');

		return tarot.sendTarotCard(message.channel, deckName, cardNumber, cardName);
	}
	else if (args[0].toLowerCase() === "deck") {
		const deckName = args[1];
		return tarot.sendTarotDeckList(message.channel, deckName);
	}
	else {
		return tarot.sendHelpMessage(message.channel);
	}
};
