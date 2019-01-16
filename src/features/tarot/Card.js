const attachmentUtils = require(`${__basedir}/src/functions/attachmentUtils.js`);

class TarotCard {
	constructor(cardData) {
		this.number = cardData.number;
		this.arcana = cardData.arcana;
		this.name = cardData.name;
		this.displayName = cardData.displayName;
		this.image = cardData.image;
	}
	getFullCardName() {
		if (this.displayName) {
			return this.displayName;
		}
		if (this.arcana.toLowerCase() === 'major') {
			return `${this.name} (${this.number})`
		}
		else {
			return `${this.number} of ${this.name}`
		}
	}
	getCardImageStream() {
		return attachmentUtils.createAttachmentStream(`${__publicdir}${this.image}`);
	}
}

module.exports = {
	TarotCard,
	createTarotCard: function(cardData) {
		return new TarotCard(cardData);
	},
	createRandomTarotCard: function(deckData) {
		const deckMaxBound = deckData.cards.length;
		const cardNumber = Math.floor(Math.random()*deckMaxBound);
		const randomCardData = deckData.cards[cardNumber];
		return module.exports.createTarotCard(randomCardData);
	}
}
