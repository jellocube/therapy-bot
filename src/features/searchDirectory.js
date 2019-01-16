const Discord = require('discord.js');
var lunr = require('lunr');		// lunr is our search module
const directorySearch = require("../functions/searchDirectory.js")

// This takes the !directory command and passes it/handles the arguments as needed.

module.exports = {
	searchDirectory: function(client, message, args) {		// the library file
		const directoryIndexJSON = require("../../data/directory.json")		// make a lunr-readable reference array items populated from the library array
		const directoryReferenceArray = directorySearch.makeArrayFromJSON(directoryIndexJSON);		// make directory listing for reference
		const query = args.join(" ");		// join arguments into search term query

		const results = directorySearch.getResults(query, directoryReferenceArray);			// do search via command and store the results
		const resultsArray = directorySearch.makeResultsArray(results, directoryReferenceArray, 1.5);		// take the stored results and make a human-readable array of them by referencing the directoryReference object
	
		return directorySearch.sendDirectoryEmbed(message, query, results, resultsArray, directoryReferenceArray)
	}
}