const Discord = require('discord.js');
const userRoles = require('../features/moderation/userRoles.js');

module.exports = (client, message) => {
	let callingMember = message.member;
	const messageContent = message.cleanContent.slice(1);	// remove prefix from command message

	if (userRoles.doesUserHaveRole(callingMember, messageContent)) {
		userRoles.removeUserRole(callingMember, message.channel, messageContent);		// if user already has role, remove it		
	} else {
		userRoles.addUserRole(callingMember, message.channel, messageContent);		// if user doesn't have role, add it
	}
}
