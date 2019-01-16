const Discord = require('discord.js');

module.exports = (client, message, args) => {
	console.log(`Log: ${message.guild.nameAcronym}: serverinfo request from: ${message.author.tag}`);
	const embed = new Discord.RichEmbed()       // this will need to be updated to Discord.MessageEmbed once the Discord.js version is updated to version 12
		.setTitle('Server Information')
		.setDescription('Let me tell you about this place.')
		.setThumbnail(message.guild.iconURL)
		.addBlankField()
		.setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)
		.addField('Server Demographics:', `${message.guild.members.filter(member => member.user.bot).size} bot among ${message.guild.memberCount} members.`)
		.addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice and ${message.guild.channels.filter(chan => chan.type === 'text').size} text channels`)

	message.channel.send({ embed });
};
