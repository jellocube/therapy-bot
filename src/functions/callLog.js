const makeEmbed = require('./makeEmbed.js')
const guildUtils = require('./guildUtils.js')

const messageLoggingTerminal = 1;		// toggles logging of all sent messages (messageSend() below) in the terminal
const messageLoggingPublic = 0;		// toggles logging of all sent messages in the #logs channel

module.exports = {		// these are all of the log call functions
	messageSend: function(message) {
		if(message.author.bot) return;
		if(messageLoggingTerminal) {		// if logging to the terminal is enabled, do so
			console.log(`Log: ${message.guild.nameAcronym}.#${message.channel.name}: message sent: ${message.guild.nameAcronym}.#${message.channel.name}: ${message.author.tag}: ${message}`);
		}
		if(messageLoggingPublic) {			// if logging to the server #logs channel is enabled, do so
			makeEmbed.log1Field(message.guild, `10070709`, `Log: **Message Sent**`, `${message.author.tag}: ${message}`);
		}
		return
	},

	messageDeleted: function(message) {
		logchan = guildUtils.getChannelByKey(message.guild, "logs")
		if(message.author.bot == 1 && message.channel == logchan) { // if messages in the logs channel posted by a bot are being deleted, report a security breach
			console.log(`Log: ${message.guild.nameAcronym}.#${message.channel.name}: messages DELETED by BOT AUTHOR ${message.author.tag}, possible LOG TAMPERING detected.`);
			makeEmbed.log1Field(message.guild, `15478621`, `Log: **Security: Someone is deleting the logs!**`, "");
		}
		console.log(`Log: ${message.guild.nameAcronym}.#${message.channel.name}: message DELETED: ${message.author.tag}: ${message}`);
		makeEmbed.log1Field(message.guild, `15478621`, `Log: **Message Deleted**`, `**${message.author.tag}** in **${message.channel}**:\n${message}`);
		return
	},

	messageEdited: function(oldMessage, newMessage) {
		if(oldMessage.author.bot) return;		// ignore bot edits
		if(oldMessage == newMessage) return;		// do not log link preview updates, because they have identical content
		console.log(`Log: ${newMessage.guild.nameAcronym}.#${newMessage.channel.name}: message CHANGED: ${newMessage.author.tag}: From: \n> ${oldMessage}\nTo:\n> ${newMessage}`);
		makeEmbed.log3Field(oldMessage.guild, `16761600`, `Log: **Content Changed**`, `Message by **${oldMessage.author.tag}** in **${oldMessage.channel}** has been changed`, "**From:**", `${oldMessage}`, "**To:**", `${newMessage}`);
		return
	},

	userJoined: function(client, member, invite, inviter) {
		console.log(`Log: ${member.guild.nameAcronym}: user joined: ${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id}) using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
		makeEmbed.log1Field(member.guild, `14350246`, `Log: **User Joined**`, `${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
	},

	userDeparted: function(client, member) {
		console.log(`Log: ${member.guild.nameAcronym}: user departed: ${member.user.tag} (${member.id}) has departed ${member.guild.name} (${member.guild.id}).`);
		makeEmbed.log1Field(member.guild, `15478621`, `Log: **User Departed**`, `**${member.user.tag}** has departed (or been kicked).`);
	},

	userBanned: function(client, guild, user) {
		console.log('Log', `${user.tag} (${user.id}) has been banned.`);
		makeEmbed.log1Field(guild, `15478621`, `Log: **User Banned**`, `**${user.tag}** has been **banned**.`);
	},

	userUnbanned: function(client, guild, user) {
		console.log('Log', `${user.tag} (${user.id}) has been unbanned.`);
		makeEmbed.log1Field(guild, `16761600`, `Log: **User Unbanned**`, `**${user.tag}** has been **unbanned**.`);
	},

	botRestart: function(client, guild) {
//		const techRole = guild.roles.find("name", roles.technicians);		// in case we want to ping Technicians in the bot restart messages, we'll need something like this here
		console.log('Log:', `Sibyl has booted and is now logged in.`);
		makeEmbed.log1Field(guild, `15478621`, `Log: **Bot Rebooted**`, `I am ready. This usually means that I have either been rebooted by a user, or crashed and was reincarnated by the server host.`);
	}
}