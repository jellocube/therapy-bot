const Discord = require('discord.js');
const mute = require('../features/moderation/mute.js');

module.exports = (client, reaction, user) => {
	console.log('Log', `${user.tag} reacted to message id ${reaction.message.id} with the reaction ${reaction.emoji}`);

	if (mute.checkIsMuteReact(reaction)) {
		console.log("Muting emoji detected. Testing for reaction count...");
	
		// check vote mute conditions, then mute if conditions met
		mute.checkVoteConditions(reaction)
		.then(voteConditionsMet => {
			if (voteConditionsMet) {
				mute.muteActions(reaction.message.member);
			}
		});
	}
}
