const Discord = require('discord.js');
var lunr = require('lunr');		// lunr is our search module
const librarySearch = require("../functions/searchLibrary.js")

module.exports = {
	searchLibrary: function(client, message, args) {
		const libraryIndexJSON = require("../../data/library.json")		// the directory file
		const libraryReferenceArray = librarySearch.makeArrayFromJSON(libraryIndexJSON);	// make a lunr-readable reference array items populated from the directory array
		const query = args.join(" ");		// join arguments into search term query

		const results = librarySearch.getResults(query, libraryReferenceArray);			// do search via command and store the results
		const resultsArray = librarySearch.makeResultsArray(results, libraryReferenceArray, 3.5);		// take the stored results and make a human-readable array of them by referencing the directoryReference object
	
		return librarySearch.sendLibraryEmbed(message, query, results, resultsArray, libraryReferenceArray)
	}
}