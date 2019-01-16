module.exports = {
	splitMessageDiscordLimit(message) {
		const discordMessageLimit = 1999;	// the character limit we're working with
		var reg = new RegExp(`[^]{0,${discordMessageLimit}}`, 'g');		// get first part of message under character limit using regex
		return message.match(reg);	// return the regex result
	}
}
