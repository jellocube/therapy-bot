const Discord = require('discord.js');

module.exports = (client, message, args) => {
	console.log('Log', 'Enacting nonviolence...');
	message.channel.send(
		{
			"embed": {
			  "description": "A server guideline/nonviolent communications reminder has been pinged.",
			  "fields": [
				{
				  "name": "You are expected to strive for these qualities in communication:",
				  "value": "(a) show empathy or compassion toward everyone\n(b) be willing to question your assumptions so other perspectives can be validated\n(c) engage in active listening, acknowledge harm others perceive you have caused, apologize or make amends\n(d) take time to disengage when you become overwhelmed by discussion; do not feel obliged to reply."
				}
			  ]
			}
		  }
	);
};
