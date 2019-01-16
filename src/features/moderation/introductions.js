const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');
const servers = require('../../../config/servers.json');

module.exports = {	// change these so they read from the server config file! if possible.
	sendWelcomeMessage: function(guildMember) {
//		let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>.** In order to register for full access, please share something about yourself here. Take some time to read the rules and guidelines in #server.`
//		let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>!** In order to access more channels please write an intro for yourself -- perhaps include your age, pronouns, region, interests, or how you got here. Please take some time to read the rules and guidelines in #${channels.server} and enjoy your stay! If you have any questions, ask away in #${channels.casual}.`
	let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>!** In order to access more channels please write an introduction in #${channels.introductions} sharing things like your age, region, interests, gender/pronouns, or how you got here. Read the rules and guidelines in #${channels.server}.\n\nTo search the psychedelic library, use \`\`!library [query]\`\`. To search clinical trials and organizations, try  \`\`!directory [query]\`\`. To get harm reduction and dosage information, say \`\`--info [drug]\`\` or \`\`!safety\`\` to get a list of topics.`
	return guildMember.guild.channels.find(x => x.name === channels.introductions).send(welcomeMessage);
	},

	sendWelcomeMessagePID: function(guildMember) {
		let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>.** To search the directory of organizations and trials, type \`\`!directory <query>\`\`. To search psychedelic literature citations, use \`\`!library <query>\`\`. Try \`\`!help\`\` for more options. Please take some time to read the rules and guidelines in #server and enjoy your stay.`
//		let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>!** In order to access more channels please write an intro for yourself -- perhaps include your age, pronouns, region, interests, or how you got here. Please take some time to read the rules and guidelines in <#${channels.server}> and enjoy your stay! If you have any questions, ask away in <#${channels.casual}>.`
		return guildMember.guild.channels.find(x => x.name === channels.casual).send(welcomeMessage);
	},

	registerIntroduction: function(guildMember) {
		registreeRole = guildMember.guild.roles.find(x => x.name === roles.registree);
		console.log(`Log: ${guildMember.guild.nameAcronym}: role ADDED: ${guildMember.user.tag} wrote an introduction, and now has the role ${roles.registree}.`);
		return guildMember.addRole(registreeRole).catch(console.error);
	}
}	