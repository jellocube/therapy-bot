const tarotConfig = require('../../../config/tarot.json');
const TarotDeck = require('./Deck.js');

/**
 * Creates a card spread based on a spread data set and a deck
 * @param {Object} spreadData Spread data object from data files
 * @param {Object} deck Deck class object to create spread from
 * @returns {Array.<TarotCard> Spread array of cards
 */
function createCardSpread(spreadData, deck) {
	console.log('creating card spread');

	const spreadCards = [];

	// draw raw cards
	let i = 0;

	while (i < spreadData.cards) {
		spreadCards.push(deck.drawRandomCard());
		i++;
	}

	return spreadCards;
}

/**
 * Fills in a spread layout based on a set of cards applied to a layout template
 * @param {Array} spreadCards Array of cards to use in the spread
 * @param {Array.<Array>} spreadLayout 2D grid array of cells containing either false (no card placed) or a number (indicating that card number is placed there)
 * @returns {Array} 2D grid array of cells containing either false (no card placed) or a card object
 */
function createSpreadLayout(spreadCards, spreadLayout) {
	const spreadCardsCopy = [...spreadCards];
	const spreadLayoutFilled = [];

	// generate spread laid out
	for (let r=0; r<spreadLayout.length; r++) {
		spreadLayoutFilled.push([]); // create new row in filled spread

		for (let c=0; c<spreadLayout[r].length; c++) {
			let currentCell = spreadLayout[r][c]; // cell in spread template to check
			if (currentCell === false) {
				spreadLayoutFilled[r][c] = false;
			}
			else {
				spreadLayoutFilled[r][c] = spreadCardsCopy.pop();
			}
		};
	};

	console.log('spread layout:');
	console.dir(spreadLayoutFilled);

	return spreadLayoutFilled;
}

class TarotSpread {
	constructor(deckName, spreadData) {
		this.deck = TarotDeck.createTarotDeck(deckName);
		this.deck.shuffle();
		this.querying = [];
		this.layoutBase = spreadData.layout;
		this.imageBase = spreadData.layoutImage;
		this.spreadCards = createCardSpread(spreadData, this.deck);
		this.spreadLayout;
	}
	queryCard(cardNumber, cardName) {
		const queryCard = this.deck.drawSpecifiedCard(cardName, cardNumber);
		if (queryCard) {
			this.querying.push(queryCard);
			return queryCard;
		}
		return null;
	}
	populateSpread() {
		this.spreadLayout = createSpreadLayout(this.spreadCards, this.layoutBase);
	}
}

module.exports = {
	TarotSpread,
	createTarotSpread: function(deckName, spreadName) {
		console.log('creating spread '+spreadName+' with deck '+deckName);
		const spreadData = require(`${__basedir}/data/${tarotConfig.spreads[spreadName]}`)
		return new TarotSpread(deckName, spreadData);
	}
}
