const servers = require('../../config/servers.json');

module.exports = {
	// check if guild member has a role
	checkGuildMemberHasRole: function(guildMember, roleName) {
		const role = guildMember.roles.find("name", roleName);
		return role ? true : false;
	},

	// check if guild wants moderation
	checkGuildModstate: function(guild) {
		let guildID = guild.id;
		let guildInfo = [];
		servers.servers.forEach(s => {
			if (s.id == guildID) {
				guildInfo = s
			}
		});

		return guildInfo.moderation ? true : false;
	},

	getGuildChannels: function(guild) {
		let guildID = guild.id;
		let guildInfo = [];
		servers.servers.forEach(s => {
			if (s.id == guildID) {
				guildInfo = s
			}
		});

		return guildInfo.channels;
	},

	getChannelByKey: function(guild, channel) {		// grabs a channel by its server and key name in the server config file
		let guildID = guild.id;
		let guildInfo = [];
		servers.servers.forEach(s => {
			if (s.id == guildID) {
				guildInfo = s
			}
		});

        channelByKey = guild.channels.find(x => x.name == guildInfo.channels[channel]);

		return channelByKey;
	},
        
}