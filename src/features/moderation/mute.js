const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');
const moderationConfig = require('../../../config/moderation.json');


/**
 * Check if mute react is valid based on user's permissions/roles
 * @private
 * @param {Discord.Guild} reactGuild Server/guild to test permissions on
 * @param {Discord.User} reactUser Discord user object who added the vote
 * @returns {Promise.<boolean>} true if conditions met, false if not
 */
function checkUserMutePermissions(reactGuild, reactUser) {
	let voterRole = reactGuild.roles.find(x => x.name === roles.community);

	return reactGuild.fetchMember(reactUser)
	.then(guildMember => {
		if (guildMember.roles.find(x => x.name === voterRole.name)) {
			console.log(reactUser.tag + " has the peer-mute Role, mute vote will be counted.");
			return true;
		};

		return false;
	})
};


/**
 * Adds muted role to user and strips their registree/community roles
 * @private
 * @param {Discord.GuildMember} Server member to perform mute action on
 * @returns {Promise.<Array>} Returns a promise containing results of role actions
 */
function muteUser(userTarget) {
	let muteRole = userTarget.guild.roles.find(x => x.name === roles.muted);
	let communityRole = userTarget.guild.roles.find(x => x.name === roles.community);
	let memberRole = userTarget.guild.roles.find(x => x.name === roles.registree);    

	let rolePromises = [];

	rolePromises.push(userTarget.removeRole(communityRole));
	rolePromises.push(userTarget.removeRole(memberRole)); // remove member role if the muted poster had one                         
	rolePromises.push(userTarget.addRole(muteRole));  // remove voter role if the muted poster had one

	return Promise.all(rolePromises);
}


/**
 * Sends arbitration notifications to peer moderation and arbitration channels, tagging user in question
 * @private
 * @param {Discord.GuildMember} Server member to notify
 * @returns {Promise.<Array>} Returns a promise containing results of message actions
 */
function sendArbitrationNotices(userTarget) {
	let peerModChannel = userTarget.guild.channels.find(x => x.name === channels.community);
	let arbitrationChannel = userTarget.guild.channels.find(x => x.name === channels.arbitration);
	let muteThreshold = moderationConfig.muteVoteThreshold;

	let peerModMessage = `**${userTarget} has been muted.**`
	let arbitrationMessage = `Hello <@${userTarget.id}>, you have been placed in ${arbitrationChannel}. If you are here, this means that ${muteThreshold} or more server members have voted to mute you from the primary chats. Please speak with a member of the staff when they are available to discuss why you have been muted by the community.`

	let messagePromises = [];

	messagePromises.push(peerModChannel.send(peerModMessage))
	messagePromises.push(arbitrationChannel.send(arbitrationMessage));

	return Promise.all(messagePromises);
}


module.exports = {
	/**
	 * Mute guild member and send notification messages to appropriate channels
	 * @param {Discord.GuildMember} muteGuildMember Server member to mute
	 * @returns {Promise}
	 */
	muteActions: function(muteGuildMember) {
		return muteUser(muteGuildMember)
		.then(() => {
			return sendArbitrationNotices(muteGuildMember);
		});
	},


	/**
	 * Checks if specified reaction is a mute react
	 * @param {Discord.MessageReaction} reaction Reaction to check
	 * @returns {boolean}
	 */
	checkIsMuteReact: function (reaction) {
		if (reaction.emoji.name === moderationConfig.muteReact) {
			return true;
		}
		return false;
	},


	/**
	 * Checks all votes on a message reaction to see whether mute conditions are reached
	 * @param {Discord.MessageReaction} reaction Reaction to test votes on
	 * @returns {Promise.<boolean>}
	 */
	checkVoteConditions: function (reaction) {
		let muteThreshold = moderationConfig.muteVoteThreshold;
		let muteCheckPromises = [];

		// check member permissions for each vote
		reaction.users.forEach(function(voteUser) {
			muteCheckPromises.push(checkUserMutePermissions(reaction.message.guild, voteUser));
		})

		return Promise.all(muteCheckPromises).then(voteResults => {
			console.log('all votes counted');
			let voteCount = voteResults.filter(vote => (vote === true)).length; // count only valid votes

			// if vote count meets threshold, mute
			if (voteCount >= muteThreshold) {
				console.log(`threshold of ${muteThreshold} votes reached`);
				return true;
			}
			// no mute
			else {
				console.log(`threshold of ${muteThreshold} votes not reached, only ${voteCount} votes counted, taking no action`);
				return false;
			}

		}).catch(console.error);
	}
}
