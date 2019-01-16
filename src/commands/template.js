const Discord = require('discord.js');
const makeEmbed = require("../functions/makeEmbed.js");

module.exports = (client, message, args) => {
		// To make a new command, duplicate this file and make edits. Be sure to rename the file to something very similar to the command name, and add a command alias (commands should be all-lowercase) in index.js with the others, in alphabetical order, using this line of code:
		// client.commands.set('commandname', require('./src/commands/commandname.js'));
		// Don't forget to add an entry in ./config/commandInfo, too!

		// To enable features, remove the "//>" prefixes to turn them on.
	
		// Log to the console
//> console.log('Log', 'This is where the console log message goes...');
	
		// Log to #logs
//> makeEmbed.log1Field(message.guild, `10070709`, `Log: **Log message title**`, `The user ${message.author.tag} typed the following message, thereby calling this command: ${message}`);
	
	let title = "Title of your infothing.";	// the embed title, etc.
	let text = "Embed text goes here. By default, a photo of rose granite follows if the image embed is being used.";
	let imageURL = "https://i.imgur.com/SPtHQId.jpg";

		// Sends the embed to the channel where the command message was sent, without a nice picture:
//> makeEmbed.embed1Field(client, `10070709`, title , text, message);

		// Sends the image-containing embed to the channel where the command message was sent:
	makeEmbed.embedImg1Field(client, `10070709`, title , text, imageURL, message);	

		// Sends a 3-field embed to the channel where the command message was sent:
//> title1 = "This is the first title field below the primary title and text field.";
//> text1 = "This is the first text field below the primary title and text field.";
//> title2 = "This is the second title field below the primary title and text field.";
//> text2 = "This is the second text field below the primary title and text field.";

		// Without image:
//>	makeEmbed.embed3Field(client, `10070709`, title , text, title1, text1, title2, text2, message);	

		// With an image:
//> makeEmbed.embedImg3Field(client, `10070709`, title , text, title1, text1, title2, text2, imageURL, message);	

}