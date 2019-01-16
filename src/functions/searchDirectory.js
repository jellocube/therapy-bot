const Discord = require('discord.js');
var lunr = require('lunr');		// lunr is our search module
var fs = require('fs');
const citationMaker = require("./makeCitation.js")
const embedMaker = require('./makeEmbed.js')

module.exports = {
	makeArrayFromJSON: function(JSONfile) {		// function to make a listing of the directory
		arrayOut = [];
		for(i = 0; i < JSONfile.length; i++) {		// loop to create directory variable and populate it with the search array strings
			var obj = JSONfile[i];
			var item = {
				'id': i,
				'category': obj.category,
				'title': obj.title,		// only one parameter per element for now, this can be expanded if we want to use the CSV later
				'url_info': obj.url_info,
				'organizers': obj.organizers,
				'location': obj.location,
				'description': obj.description,
				'contact': obj.contact,
				'language': obj.language,
				'ended_in': obj.ended_in
			}
			arrayOut.push(item)
		}

		return arrayOut
	},

	getResults: function(query, directoryArray) {
		console.log(`Log: search called: Someone called a search for ${query}. Directory index length: ` + directoryArray.length);
		const directory = lunr(function () {	// create Lunr search directory
			this.ref('id');
			this.field('title', {boost: 10});
			this.field('category');
			this.field('url_info');
			this.field('organizers');
			this.field('location', {boost: 10});
			this.field('description');
			this.field('contact');
			this.field('language');
			this.field('ended_in');

			for(i = 0; i < directoryArray.length; i++) {		// loop to create directory variable and populate it with the search array strings
				var obj = directoryArray[i];
				var item = {
					'id': i,
					'title': obj.title,
					'category': obj.category,
					'url_info': obj.url_info,	
					'organizers': obj.organizers,
					'location': obj.location,
					'description': obj.description,	
					'contact': obj.contact,
					'language': obj.language,
					'ended_in': obj.ended_in
				};
				this.add(item);				// console.log("Log: search index: added: " + item.id + item.date + item.title + item.authors);
			};
		});
		
		var results = directory.search(query);
		console.log("Log: search: search complete! Number of results: " + results.length);

		if (results.length === 0) {
			return false
		};

		return results
	},

	makeResultsArray: function(searchResults, searchIndexReference, confidenceThreshold) {
		var resultsArray = []; // array for the results we're going to return

		for (i = 0; i < searchResults.length; i++) { // for each search result, find its reference in the Index
			var result = searchResults[i].ref;
			if (searchResults[i].score > confidenceThreshold) {		// loop to populate the array with confident results from searchIndexReferences
				resultsArray.push(searchIndexReference[result]);
			} else if (searchResults[i].score > 0 && searchResults[i].score < confidenceThreshold) {
				console.log("Log: search results: excluded from array: " + searchIndexReference[result].title + "with a confidence of " + searchResults[i].score);
			}
		}

		return resultsArray;
	},

	makeCitationsArray: function(resultsArray) {		// function to make array of nicely-formatted citations for directory result references
		var characterLimit = 1750;		// citations won't be added to the response if they're under this limit
		var citationArray = [];

		for (i = 0; i < resultsArray.length; i++) {				// make an array of all the citations
			var item = citationMaker.makeDirectoryCitation(resultsArray, i); 
			var joinedCharacterCount = (citationArray.join("\n")).length;
			console.log(`Log: searching: added to results array: ` + (i + 1) + ": " + resultsArray[i].title + `(${item.length} characters in array so far)`);

			if (joinedCharacterCount + item.length < characterLimit) {
				citationArray.push(item)
			}
		}

		return citationArray		// return citations
	},

	sendDirectoryEmbed: function(message, query, results, resultsArray, directoryReferenceArray) { 	// function to send an embed containing directorysearch results
		let droppedCount = results.length - resultsArray.length;
		let citationArray = module.exports.makeCitationsArray(resultsArray);
		let firstPageCount = citationArray.length - resultsArray.length;

		if (query == "") {
			return embedMaker.library3Fields(`16761600`, `**Directory Information**`, `The directory, curated by [Psychedelic Praxis](https://discord.gg/wCac66M) and the [Psychedelic Therapy Directory](https://discord.gg/dbJX7G) project, currently contains ${directoryReferenceArray.length} entries related to psychedelic therapy, research, events, and organizations.\n\n`, "**Our Information Online**", `[Psychedelic Praxis News Feed](https://www.reddit.com/r/psychedelicpraxis/)\n[Guide to Harm Reduction & Comfortable Trip](https://old.reddit.com/r/psychedelicpraxis/wiki/safety)\n[List of Ongoing Studies](https://www.reddit.com/r/psychedelicpraxis/wiki/studies)\n[Web Resources](https://www.reddit.com/r/psychedelicpraxis/wiki/webresources).`, "**Commands**", "`!directory [query]`", message)
		}

		else if (resultsArray.length == 0) {
			message.channel.send("Sorry, I couldn't find anything about \"" + query + "\"!");
			return false
		};

		/*collector to collect !more and !info
		const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
		collector.on('collect', message => {
			console.log(message.content);
			collector.stop("Got my message");
		});
		*/

		return embedMaker.library1Field(`16761600`, `**Directory Search Results**`, `I've found ${resultsArray.length} results on "${query}", with ${droppedCount} irrelevant. Here are the first ${citationArray.length}:\n\n` + citationArray.join("\n") + "\nType ``!directory`` without a query for more information.", message)
	}
  }