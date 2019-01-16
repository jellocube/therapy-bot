const Discord = require('discord.js');
const directorySearch = require('../features/searchDirectory.js');

  module.exports = (client, message, args) => {
    directorySearch.searchDirectory(client, message, args);	
};