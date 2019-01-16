const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');

module.exports = {
	checkMeetupPermissions: function(guildMember) {
		if (guildMember.roles.find(x => x.name === roles.community)) {
			console.log(`Log: ${guildMember.guild.nameAcronym}: role request: ${guildMember.user.tag} requested location verified role and has the precedent community role.`);
			return true;
		}
		return false;
	},

	addUserMeetup: function(guildMember, locationString) {
		let meetupRole = guildMember.guild.roles.find(x => x.name === roles.locationVerified);
		
		if (!meetupRole) {		// check if a meetup role exists. if not, return.
			console.log(`Log: ${guildMember.guild.nameAcronym}: role ERROR: ${guildMember.user.tag} requested location verified role but none exists on this server as defined by the bot config.`);
			return
		};
		
		let meetupNotificationMessage = (`**<@${guildMember.user.id}>** has been deemed ${meetupRole.name} at location **${locationString}**`);

		return guildMember.addRole(meetupRole)
		.then(() => {
			console.log(`Log: ${guildMember.guild.nameAcronym}: role ADDED: ${guildMember.user.tag} was made a meatspacer.`);
			return guildMember.guild.channels.find(x => x.name === channels.meetups).send(meetupNotificationMessage);
		}).then(message => {
			return message.pin();	
		}).catch(console.error);
	},

	sendMeetupFailMessage: function(guildChannel) {
		return guildChannel.send(`Please specify your location. Example: \`!meetup New York City\``)
	},

	sendIncorrectPermissionsMessage: function(guildChannel) {
		return guildChannel.send(`Meetup rights are only available to ${roles.community}`)            
	}
}