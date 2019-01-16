const introductions = require('../features/moderation/introductions.js');
const callLog = require('../functions/callLog.js');     

module.exports = {
	join: function(client, member, invites) {
	// To compare, we need to load the current invite list.
	member.guild.fetchInvites().then(guildInvites => {
		// This is the *existing* invites for the guild.
		const ei = invites[member.guild.id];
//		console.log(invites);				// in case you wanna see the invite objects
		// Look through the invites, find the one for which the uses went up.
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		// This is just to simplify the message being sent below (inviter doesn't have a tag property)
		const inviter = client.users.get(invite.inviter.id);
		// A real basic message with the information we need. 
		callLog.userJoined(client, member, invite, inviter);
		});
	
	//log when a user joins server
//	console.log(`Log: user joined: ${member.guild.nameAcronym}: ${member.user.tag} (${member.id}) joined ${member.guild.name} (${member.guild.id}.)`);

	//send praxis message
	if (member.guild.id == "350132819307003905") {
		introductions.sendWelcomeMessage(member);
	};

	//send PID message
	if (member.guild.id == "510971727967289360") {
		introductions.sendWelcomeMessagePID(member);
	}

	},

	depart: function(client, member) {
		// To compare, we need to load the current invite list.
		callLog.userDeparted(client, member);
		//log when a user joins server
	},

	ban: function(guild, user) {
		// To compare, we need to load the current invite list.
		client = user.client;
		callLog.userBanned(client, guild, user);
		//log when a user joins server
	},

	unban: function(guild, user) {
		// To compare, we need to load the current invite list.
		client = user.client;
		callLog.userUnbanned(client, guild, user);
		//log when a user joins server
	}
}
