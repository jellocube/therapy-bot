const Discord = require('discord.js');
const community = require('../features/moderation/community.js');

module.exports = (client, message, args) => {
	console.log('Log', 'add-to-community command call');
	let callingMember = message.member;

	if (args.length === 0) {
		return community.sendAddCommunityFailMessage(message.channel);
	}; 

	if (community.checkAddCommunityPermissions(callingMember)) {
		community.addMemberCommunity(callingMember, args[0]);
	}
	else {
		community.sendIncorrectPermissionsMessage(message.channel);
	}
}
