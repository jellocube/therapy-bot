const Discord = require('discord.js');
var lunr = require('lunr');		// lunr is our search module
var fs = require('fs');
const citationMaker = require("./makeCitation.js")
const embedMaker = require('./makeEmbed.js')

module.exports = {
	makeArrayFromJSON: function(JSONfile) {		// function to make a listing of the directory from a JSON file
		arrayOut = [];
		for(i = 0; i < JSONfile.length; i++) {		// loop to create directory variable and populate it with the search array strings
			var obj = JSONfile[i];
			var item = {
				'id': i,
				'date': obj.date,
				'title': obj.title,	
				'authors': obj.authors
			}
			arrayOut.push(item)	// add item to array
		}

		return arrayOut // return the item array built from the JSON
	},

	getResults: function(query, libraryArray) {		// function to get library results within library array from query
		console.log(`Log: search called: Someone called a search for ${query}. Directory index length: ` + libraryArray.length);
		const directory = lunr(function () {	// initialize Lunr search directory
			this.ref('id');
			this.field('date');
			this.field('authors', {boost: 10});
			this.field('title');

			for(i = 0; i < libraryArray.length; i++) {		// loop to create directory variable and populate it with the search array strings
				var obj = libraryArray[i];
				var item = {
					'id': i,
					'date': obj.date,
					'title': obj.title,	
					'authors': obj.authors
				};
				this.add(item);				// bugtesting logger: console.log("Log: search index: added: " + item.id + item.date + item.title + item.authors);
			};
		});
		
		var results = directory.search(query);		// generate results array using the search function
		console.log("Log: search: search complete! Number of results: " + results.length);

		if (results.length === 0) {		// if no results, return false
			return false
		};

		return results		// otherwise we return results
	},

	makeResultsArray: function(searchResults, searchIndexReference, confidenceThreshold) {	// using the search results, pair them with easily-formatted references in searchIndexReferences, and return those above a given search confidence threshold
		var resultsArray = [];		// array for the results we're going to return

		for (i = 0; i < searchResults.length; i++) {		// for each search result, find its reference in the Index
			var result = searchResults[i].ref;
			if (searchResults[i].score > confidenceThreshold) {		// loop to populate the array with confident results from searchIndexReferences
				resultsArray.push(searchIndexReference[result]);
			} else if (searchResults[i].score > 0 && searchResults[i].score < confidenceThreshold) {		// log excluded unconfident results, for bugtesting
				console.log("Log: search results: excluded from array: " + searchIndexReference[result].title + "with a confidence of " + searchResults[i].score);
			}
		}

		return resultsArray;
	},

	makeCitationsArray: function(resultsArray) {		// function to make array of nicely-formatted citations for library result references
		var characterLimit = 1750;		// citations won't be added to the response if they're under this limit
		var citationArray = [];

		for (i = 0; i < resultsArray.length; i++) {				// make an array of all the citations
			var item = citationMaker.makeLibraryCitation(resultsArray, i); 
			var joinedCharacterCount = (citationArray.join("\n")).length;
			console.log(`Log: searching: added to results array: ` + item + `(${item.length} characters in array so far`);

			if (joinedCharacterCount + item.length < characterLimit) {
				citationArray.push(item)
			}
		}

		return citationArray		// return citations
	},

	sendLibraryEmbed: function(message, query, results, resultsArray, libraryReferenceArray) {	// function to send an embed containing library search results
		let droppedCount = results.length - resultsArray.length;
		let citationArray = module.exports.makeCitationsArray(resultsArray);

		if (query == "") {
			return embedMaker.library3Fields(`16761600`, `**Library Information**`, `The library, curated by [Psychedelic Praxis](https://discord.gg/wCac66M) and the [Psychedelic Therapy Directory](https://discord.gg/dbJX7G) project, currently contains ${libraryReferenceArray.length} items of literature and media pertaining to psychedelic research or culture.\n\n`, "**Accessing articles via Sci-Hub:**", `Sci-Hub can link you to a download of nearly any academic paper. Because it is prone to service interruptions, feel free to [use this link](https://whereisscihub.now.sh/go) to access their working domain, or visit [https://whereisscihub.now.sh/](https://whereisscihub.now.sh/) for a list of mirrors.`, "**Finding books & multimedia**", `Many books can be found through the ebook search engine [http://libgen.io/](http://libgen.io/). A great deal of psychedelic multimedia is available on YouTube, or is in the Psychedelic Praxis library torrent -- type \`\`!torrent\`\` for more information. An HTTP mirror of the library is currently hosted by [the-eye.eu at this mirror](https://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0/).`, message)
		}

		else if (resultsArray.length == 0) {
			message.channel.send("Sorry, I couldn't find anything about \"" + query + "\"!");
			return false
		};

		return embedMaker.library1Field(`16761600`, `**Library Search Results**`, `I've found ${resultsArray.length} citations on "${query}", with ${droppedCount} irrelevant. Here are the first ${citationArray.length}:\n\n` + citationArray.join("\n") + "\n\nType ``!library`` without a query for access information.", message)
	}
  }