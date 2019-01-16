const Discord = require('discord.js');
const moderationConfig = require('../../../config/moderation.json');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');


module.exports = {
	checkAddCommunityPermissions: function(guildMember) {
		let operatorRole = guildMember.guild.roles.find(x => x.name === roles.operator);
		if (guildMember.roles.find(x => x.name === operatorRole.name)) {
			return true;
		}
		return false;
	},

	addMemberCommunity: function(callingMember, userTagString) {
		const addingMember = callingMember.guild.members.find(member => member.user.tag === userTagString);
		if (!addingMember){
			console.log(`Log add-to-community command: invalid usename submitted.`)
			return false
		};

		const communityRole = callingMember.guild.roles.find(role => role.name === roles.community);
		const communityNotificationMessage = (`Welcome <@${addingMember.user.id}> -- you have been elected to the @Community role and now have access to #${channels.community} and other protected channels. As outlined in #${channels.server}, @Community members can help peer-moderate by responding to offensive messages with a ${moderationConfig.muteReact} react. If you would like still more server access, you can be @Certified by declaring your real-life location to join the #${channels.meetups} channel by entering !meetup <your location>, or gain the @Researcher role by submitting to #${channels.library}.`);
		const communityChannel = callingMember.guild.channels.find(x => x.name === channels.community)

		return addingMember.addRole(communityRole)
		.then(() => {
			return communityChannel.send(communityNotificationMessage);
		}).catch(console.error);
	},

	sendAddCommunityFailMessage: function(guildChannel) {
		return guildChannel.send(`Please specify which member to add to ${roles.community}. Example: \`!community sibyl-oracle#5143\``)
	},

	sendIncorrectPermissionsMessage: function(guildChannel) {
		return guildChannel.send(`Command only available to ${roles.operator} role`)            
	}
}
