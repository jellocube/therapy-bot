module.exports = {
	makeLibraryCitation: function(searchResultsArray, resultID) {
		var searchResultItem = searchResultsArray[resultID];		// grab search result from item array by ID
		
		if(searchResultItem.authors == "" & searchResultItem.date == "") {		// return formatting based on which information is present
			var citation = `• __${searchResultItem.title}__.`;
			return citation
		} else if (searchResultItem.authors != "" & searchResultItem.date == "") {
			var citation = `• ${searchResultItem.authors}, __${searchResultItem.title}__.`;
			return citation
		} else if (searchResultItem.authors != "" & searchResultItem.date != "") {
			var citation = `• ${searchResultItem.authors}, __${searchResultItem.title}__. ${searchResultItem.date}.`;
			return citation
		} else if (searchResultItem.authors == "" & searchResultItem.date != "") {
			var citation = `• __${searchResultItem.title}__. ${searchResultItem.date}.`;
			return citation
		} else {
			var citation = `> __${searchResultItem.title}__. ${searchResultItem.date}.`;
			return citation
		}
	},

	makeDirectoryCitation: function(searchResultsArray, resultID) {
		var searchResultItem = searchResultsArray[resultID];	// grab search result from item array by ID
		var citation = "";
		// return formatting based on which information is present
		if(searchResultItem.url_info != "") {citation = (resultID + 1) + `: **[${searchResultItem.title}](${searchResultItem.url_info})** (${searchResultItem.category})\n`};
		if(searchResultItem.url_info == "") {citation = (resultID + 1) + `: **${searchResultItem.title}** (${searchResultItem.category})\n`};
		if(searchResultItem.organizers != "") {citation = citation + "Organizers: " + searchResultItem.organizers + "\n"};
		if(searchResultItem.location != "") {citation = citation + "Location: ``" + searchResultItem.location + "``\n"};
		// if(searchResultItem.description != "") {citation = citation + "Description: ``" + searchResultItem.description + "``\n"};		// descriptions are disabled for now, but can be returned later with a difference command. descriptions are still being searched!
		if(searchResultItem.contact != "") {citation = citation + "Contact: ``" + searchResultItem.contact + "``\n"};

		return citation
	}
}