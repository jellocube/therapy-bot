const Discord = require('discord.js');
const crystals = require('../../data/replies/crystals.json');
const makeEmbed = require("../functions/makeEmbed.js");

function findCrystal(userQuery, videoList) {		// we have to convert all the string to lowercase to sanitize the text
	let queriedCrystal = "";
	let lowercaseQuery = userQuery.toString().toLowerCase();;

	videoList.crystals.forEach(crystalInfo => {
		let lowercaseCrystal = crystalInfo.name.toString().toLowerCase();

		if (lowercaseCrystal == lowercaseQuery) {	// crystal is found
			queriedCrystal = crystalInfo;
		} else if (lowercaseCrystal != lowercaseQuery) { // crystal not found
		}
	});
	return queriedCrystal
};

module.exports = (client, message, args) => {
	console.log('Log', 'Displaying a crystal...');
	let crystalList = crystals.crystals;		// default list of crystal info
	let thisCrystal = findCrystal(args, crystals);

	if (thisCrystal) {		// the user has specified a crystal we know about, let's send info on it!
		makeEmbed.embedImg1Field(client, `10070709`, `**Your Crystal: ${thisCrystal.name}**`, thisCrystal.description, thisCrystal.imageURL, message);
	} else if (thisCrystal == "") {		// no crystal specified
		let randomChoice = Math.floor((Math.random() * crystalList.length ) );
		thisCrystal = crystalList[randomChoice];
		makeEmbed.embedImg1Field(client, `10070709`, `**Random Crystal: ${thisCrystal.name}**`, thisCrystal.description, thisCrystal.imageURL, message);
	} else { 	// invalid crystal
		let randomChoice = Math.floor((Math.random() * crystalList.length ) );
		thisCrystal = crystalList[randomChoice];
		makeEmbed.embedImg1Field(client, `10070709`, `**Crystal not found, random crystal: ${thisCrystal.name}**`, thisCrystal.description, thisCrystal.imageURL, message);
	}
}