const tarotConfig = require('../../../config/tarot.json');
const TarotCard = require('./Card.js');

function createCardData(deckCards) {
	const cards = [];
	deckCards.forEach(cardData => {
		cards.push(TarotCard.createTarotCard(cardData));
	});
	return cards;
}

class TarotDeck {
	constructor(deckData) {
		this.name = deckData.name;
		this.cardsBase = createCardData(deckData.cards); // reference for all total cards in deck
		this.cardsRemaining = [...this.cardsBase]; // shows cards currently "in the deck" for if someone is using it
	}
	shuffle() {
		const cardsRemaining = [...this.cardsBase];

		// fisher-yates shuffle
		let currentIndex = cardsRemaining.length, temporaryValue, randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = cardsRemaining[currentIndex];
			cardsRemaining[currentIndex] = cardsRemaining[randomIndex];
			cardsRemaining[randomIndex] = temporaryValue;
		}
		this.cardsRemaining = cardsRemaining;

		return this.cardsRemaining;
	}
	drawRandomCard() {
		const randomIndex = Math.floor(Math.random() * this.cardsRemaining.length);
		console.log('found random card at '+randomIndex);
		return this.cardsRemaining.splice(randomIndex, 1)[0];
	}
	drawSpecifiedCard(cardName, cardNumber) {
		for (let i=0; i<this.cardsRemaining.length; i++) {
			let cardChecking = this.cardsRemaining[i];
			if ((cardName.toLowerCase() === cardChecking.name.toLowerCase()) && (parseInt(cardNumber) === parseInt(cardChecking.number))) {
				console.log('card found');
				return this.cardsRemaining.splice(i, 1)[0];
			}
		}
		console.log('card not found');
		return null;
	}
}

module.exports = {
	TarotDeck,
	createTarotDeck: function(deckName) {
		const deckData = require(`${__basedir}/data/${tarotConfig.decks[deckName]}`)
		const deck = new TarotDeck(deckData);
		return deck;
	}
}
