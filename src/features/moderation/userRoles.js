const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const tempRoleReplies = require('../../../data/replies/tempRoles');

module.exports = {
	getUnmentionable: function(userRole) {		// generates a role name without the "@ " mention part
		const userRoleLength = userRole.length;
		const unmentionableName = String(userRole.name).substring(3, userRoleLength).toLowerCase(); // trims first 2 characters ("@ ")
		return unmentionableName;
	},

	doesUserHaveRole: function(guildMember, roleName) {			// this function will check if user already has the role they're requesting'
		console.log(`Log: ${guildMember.guild.nameAcronym}: role request: ${guildMember.user.tag}: checking for ${roleName} role...`);		
		let userRole = guildMember.guild.roles.find(x => x.name === roles[roleName]);

		if (guildMember.roles.find(x => x.name === roles[roleName])) {
			return true;	// the user already has that role
		}
		return false;	// the user must not have the role
	},

	addUserRole: function(callingMember, guildChannel, roleName) {
		if (callingMember.guild.roles.find(x => x.name === roles[roleName])) {				// find it in the json file definitions, or return an error:
			console.log(`Log: ${callingMember.guild.nameAcronym}: role request: ${callingMember.user.tag}: ${roleName} found!`);
		} else {
			guildChannel.send(`I can't find that role.`);
			console.log(`Log: ${callingMember.guild.nameAcronym}: role ERROR: ${callingMember.user.tag}: ${roleName} not found!`);
			return
		};

		// find user role string (an "unmentionableName") in config using the arg (this is redundant and could be refactored/scoped better):
		const userRole = callingMember.guild.roles.find(x => x.name === roles[roleName]);	
		unmentionableName = module.exports.getUnmentionable(userRole);

		// get random reply and send it if successful
		let randomChoice = Math.floor((Math.random() * 20 ) );
		let notificationMessage = tempRoleReplies.assignReply(randomChoice, callingMember, unmentionableName);

		return callingMember.addRole(userRole)
		.then(() => {
			console.log(`Log: ${callingMember.guild.nameAcronym}: role ADDED: ${callingMember.user.tag} given role ${roleName}.`);
			return guildChannel.send(notificationMessage);
		}).catch(console.error);
	},

	// this removes the role if the user already has it
	removeUserRole: function(callingMember, guildChannel, roleName) {
		let unmentionableName = roleName; // get an unmentionable string for whatever role we're checking for
		const userRole = callingMember.guild.roles.find(x => x.name === roles[roleName]);		// find user role in config
		userRoleName = module.exports.getUnmentionable(userRole);

		//get random reply and send it
		let randomChoice = Math.floor((Math.random() * 20 ) );
		let notificationMessage = tempRoleReplies.unassignReply(randomChoice, callingMember, unmentionableName);
		return callingMember.removeRole(userRole)
		.then(() => {
			console.log(`Log: Role Revoked: ${callingMember.user.tag} no longer has role ${roleName}.`);
			return guildChannel.send(notificationMessage);
		}).catch(console.error);
	}
}
