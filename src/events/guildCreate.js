module.exports = (client, guild) => {
	console.log('Log', `I have been added to the guild ${guild.name}, owned by ${guild.owner.user.tag}, with ${guild.memberCount} users`);
	//log guild information upon joining
}
