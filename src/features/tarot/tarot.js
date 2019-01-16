const TarotSpread = require('./Spread.js');
const SpreadImage = require('./SpreadImage.js');
const TarotDeck = require('./Deck.js');
const tarotConfig = require('../../../config/tarot.json');
const attachmentUtils = require('../../functions/attachmentUtils.js');
const stringUtils = require('../../functions/stringUtils.js');
const commandInfo = require('../../../data/commandInfo.json');

/**
 * Creates a string list of available spreads
 * @returns {string} String of available spreads listed as "id - spread name"
 */
function createSpreadList() {
	const spreads = [];
	let spreadList = "";

	Object.keys(tarotConfig.spreads).forEach(spreadId => {
		try {
			const loadedSpread = require(`${__basedir}/data/${tarotConfig.spreads[spreadId]}`);
			spreads.push(loadedSpread);
		}
		catch(e) {
			console.log(`error loading spread ${spreadId} at ${tarotConfig.spreads[spreadId]}: ${e}`);
		}
	});

	spreads.forEach(spreadData => {
		spreadList += `${spreadData.id} - ${spreadData.name}\n`;
	});

	return spreadList;
}


/**
 * Creates a string list of available decks
 * @returns {string} String of available decks listed as "id - deck name"
 */
function createDeckList() {
	const decks = [];
	let deckList = "";

	Object.keys(tarotConfig.decks).forEach(deckId => {
		try {
			const loadedDeck = require(`${__basedir}/data/${tarotConfig.decks[deckId]}`);
			decks.push(loadedDeck);
		}
		catch(e) {
			console.log(`error loading deck ${deckId} at ${tarotConfig.decks[deckId]}: ${e}`);
		}
	});

	decks.forEach(deckData => {
		deckList += `${deckData.id} - ${deckData.name}\n`;
	});

	return deckList;
}


/**
 * Pads an ascii cell with dashes based on the cell content length
 * @param {Number|boolean} cellContents Contents of cell to pad
 * @returns {string} String containing padded cell contents
 */
function padCell(cellContents) {
	const digitLength = (cellContents + "").length;
	let paddedContents = "";

	if (!cellContents && (cellContents !== 0)) {
		paddedContents = "=====";
	}
	else {
		const dashes = (digitLength % 2 === 0) ? "odd" : "even";
		const prev = (dashes === "even" ? "==" : "=");
		const after = "==";
		paddedContents = `${prev}${cellContents}${after}`;
	}

	return paddedContents;
}


/**
 * Creates a message describing a tarot spread with ascii graphics
 * @param {TarotSpread} spread Tarot spread to describe
 * @returns {string} String message describing tarot spread
 */
function createSpreadMessage(spread) {
	let spreadMessage = "Here is your tarot spread.\n```";

	for (let r = 0; r < spread.layoutBase.length; r++) {
		for (let c = 0; c <spread.layoutBase[r].length; c++) {
			let cellNumber = spread.layoutBase[r][c];
			spreadMessage += padCell(cellNumber);
		}
		spreadMessage += "\n";
	}

	spreadMessage += "\n";

	if (spread.querying.length) {
		spreadMessage += `The following card is set aside as the querent:\n`;
		spread.querying.forEach(card => {
			spreadMessage += `| ${card.getFullCardName()} |`;
		});
		spreadMessage += "\n\n";
	}

	for (let i = 0; i < spread.spreadCards.length; i++) {
		let current = spread.spreadCards[i];
		spreadMessage += `${i+1}- ${current.getFullCardName()}\n`
	}

	spreadMessage += "```";

	return spreadMessage;
}


function createCardMessage(card) {
	let cardMessage = `Here is your requested card.\n**${card.getFullCardName()}**\n`;
	return cardMessage;
}

function createDeckMessage(deck) {
	let deckMessage = `Here is the deck you requested to example.\n\n**${deck.name}**\n`;
	let deckMessageArray = [];
	let messageShortEnough = false;

	deck.cardsBase.forEach(card => {
		deckMessage += `${card.number} - ${card.name}\n`;
	});

	deckMessageArray = stringUtils.splitMessageDiscordLimit(deckMessage);

	return deckMessageArray;
}



module.exports = {
	sendTarotSpread: function(guildChannel, spreadType, deckName, queryNumber, queryName) {
		let spread, spreadMessage;

		try {
			spread = TarotSpread.createTarotSpread(deckName, spreadType);
			if (queryNumber && queryName) {
				console.log('querying card '+queryNumber+' '+queryName);
				spread.queryCard(queryNumber, queryName);
			}
			spread.populateSpread();
			console.log('spread populated');
			if (spread.imageBase) {
				return SpreadImage.createSpreadImage(spread)
				.then(spreadImagePath => {
					console.log('image created');
					spreadMessage = createSpreadMessage(spread);
					return guildChannel.send(spreadMessage, {files: [spreadImagePath]});
				});
			}
			else {
				spreadMessage = createSpreadMessage(spread);
				return guildChannel.send(spreadMessage);
			}
		}
		catch (e) {
			console.error('error finding tarot spread: '+e);
			return module.exports.sendSpreadHelpMessage(guildChannel);
		}
	},
	sendTarotCard: function(guildChannel, deckName, cardNumber, cardName) {
		let deck, requestedCard;
		try {
			deck = TarotDeck.createTarotDeck(deckName);
			requestedCard = deck.drawSpecifiedCard(cardName, cardNumber);
		}
		catch (e) {
			console.error('error finding tarot card: '+e);
			return module.exports.sendCardHelpMessage(guildChannel);
		}

		if (!requestedCard) {
			return module.exports.sendCardHelpMessage(guildChannel);
		}
		else {
			const cardMessage = createCardMessage(requestedCard);
			return guildChannel.send(cardMessage, {files: [`${__publicdir}${requestedCard.image}`]});
		}
	},
	sendTarotDeckList: function(guildChannel, deckName) {
		let deckMessageEvents = [], deck;

		try {
			deck = TarotDeck.createTarotDeck(deckName);
		}
		catch (e) {
			console.error('error finding tarot deck: '+e);
			return module.exports.sendDeckHelpMessage(guildChannel);
		}

		if (!deck) {
			return module.exports.sendDeckHelpMessage(guildChannel);
		}
		else {
			const deckMessageArray = createDeckMessage(deck);
			deckMessageArray.forEach(message => {
				if (message.length) {
					deckMessageEvents.push(guildChannel.send(message));
				}
			});
			return Promise.all(deckMessageEvents);
		}
	},
	sendCardHelpMessage: function(guildChannel) {
		let helpMessage = `I could not find the card you requested. Be sure to specify a deck and a card in the format \`!tarot card [deck] [card number] [card name for major arcana, or card suit]\`. An example: to find The World in the Rider Waite deck, use \`!tarot card riderwaite 21 the world\`. To find the 5 of Cups in the Rider Waite deck, use \`!tarot card riderwaite 5 cups\`.`;
		return guildChannel.send(helpMessage);
	},
	sendDeckHelpMessage: function(guildChannel) {
		let helpMessage = `I could not find the deck you requested. Be sure to specify a deck in the format \`!tarot deck [deck]\`. An example: to examine the Rider Waite deck, use \`!tarot deck riderwaite\`. Here is a list of decks available to me:\n\n${createDeckList()}`;
		return guildChannel.send(helpMessage);
	},
	sendSpreadHelpMessage: function(guildChannel) {
		let helpMessage = `I could not create the spread you requested. Be sure to specify a spread in the format \`!tarot spread [deck] [spread] [querent card number (optional)] [querent card name (optional)]\`. An example: to create a celtic cross spread with the Rider Waite deck, use \`!tarot spread celticcross riderwaite\`. To create a three-card spread with the Rider Waite deck and The Fool set aside as a querent, use \`!tarot spread three riderwaite 0 The Fool\`.\n\nHere is a list of spreads available to me:\n\n\`\`\`${createSpreadList()}\`\`\`\nHere is a list of decks available to me:\n\`\`\`${createDeckList()}\`\`\``;
		return guildChannel.send(helpMessage);
	},
	sendHelpMessage:function (guildChannel) {
		let helpMessage = `I can perform a variety of tarot tasks for you.\n\nIf you wish for me to lay a spread, specify a spread and a deck via the \`!tarot spread\` command in the format \`!tarot spread [spread] [deck] [querent card number (optional)] [querent card name (optional)]\`. Example: \`!tarot spread three riderwaite\` or \`!tarot spread celticcross riderwaite 1 The Magician\`..\n\nIf you wish for me to pull a specific card for you, specify a card and a deck via the \`!tarot card\` command in the format \`!tarot card [deck] [card number] [card name for major arcana or card suit]\`. Example: \`!tarot card riderwaite 0 The Fool\` or \`!tarot card riderwaite 5 Cups\`.\n\nTo see all cards in a deck, use the \`!tarot deck\` command in the format \`!tarot deck [deck]\`. Example: \`!tarot deck riderwaite\`.\nImages coming soon!\n\n**Spreads:**\n\`\`\``;
		helpMessage += createSpreadList() + "```\n**Decks**\n```";
		helpMessage += createDeckList() + "```";

		return guildChannel.send(helpMessage);
	}
}
