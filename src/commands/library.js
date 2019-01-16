const Discord = require('discord.js');
const librarySearch = require('../features/searchLibrary.js');

  module.exports = (client, message, args) => {
	librarySearch.searchLibrary(client, message, args);	
};