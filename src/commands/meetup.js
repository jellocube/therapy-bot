const Discord = require('discord.js');
const meetup = require('../features/moderation/meetup.js');

module.exports = (client, message, args) => {
	console.log(`Log: ${message.guild.nameAcronym}: role request: ${message.author.tag} wants a verified location role.`);
	let meetupUser = message.member;

	if (args.length === 0) {
		console.log(`Log: ${message.member.guild.nameAcronym}: role request: ${message.member.user.tag} requested location verified role but did not provide a location.`);
		return meetup.sendMeetupFailMessage(message.channel);
	};    

	if (meetup.checkMeetupPermissions(meetupUser)) {
		meetup.addUserMeetup(meetupUser, args.join(' '));
	}
	else {
		console.log(`Log: ${message.member.guild.nameAcronym}: role ERROR: ${message.member.user.tag} requested location verified role but does not have the community role as defined by the bot config.`);
		meetup.sendIncorrectPermissionsMessage(message.channel);
		
	}
};