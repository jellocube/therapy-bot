const Discord = require('discord.js');

module.exports = {
	assignReply(choice, callingMember, userRole) {
		const replies = [
		`Congratulations, <@${callingMember.user.id}>! You are now ${userRole}.`,
		`I see <@${callingMember.user.id}> is ${userRole} again.`,
		`I've assigned <@${callingMember.user.id}> the duty of ${userRole}.`,
		`<@${callingMember.user.id}> is ${userRole}.`,
		`By Dionysus's will, you are now ${userRole}, O mortal <@${callingMember.user.id}>.`,
		`<@${callingMember.user.id}> is almost certainly ${userRole}.`,
		`<@${callingMember.user.id}> has assumed the rank of ${userRole}.`,
		`Alright, <@${callingMember.user.id}> might be ${userRole} now, but all things pass.`,
		`<@${callingMember.user.id}> is totally ${userRole}.`,
		`<@${callingMember.user.id}>, whether ${userRole} or not ${userRole}, is nonetheless <@${callingMember.user.id}>.`,
		`<@${callingMember.user.id}> has got into the Olympian fumes again.`,
		`Great <@${callingMember.user.id}>, hope you enjoy ${userRole}.`,
		`Let's have it then, to be ${userRole} is noble work.`,
		`<@${callingMember.user.id}> shall be ${userRole} for a bit.`,
		`Dionysus declares you be ${userRole}, then.`,
		`I shall notify the genetic agents.`,
		`<@${callingMember.user.id}> appears to be ${userRole}.`,
		`<@${callingMember.user.id}> might be ${userRole} for a time, so be nice to them.`,
		`<@${callingMember.user.id}> is sailing the ship to ${userRole}town.`,
		`Now you're ${userRole}, and there's no turning back.`
		];

		return replies[choice]
	},

	unassignReply(choice, callingMember, userRole) {
		const replies = [
		`I've removed your "${userRole}" role.`,
		`You're already ${userRole}.`,
		`The <@${callingMember.user.id}> has landed.`,
		`Your "${userRole}" rank is undone.`,
		`Dionysus will be displeased.`,
		`<@${callingMember.user.id}> is no longer ${userRole}.`,
		`To be fair, you haven't been "${userRole}" for a short while now.`,
		`Alright, party's over.`,
		`You are no longer ${userRole}.`,
		`I've banished your plight of ${userRole}edness, be free.`,
		`I've removed your rank of "${userRole}."`,
		`Welcome back to sobriety.`,
		`Don't forget to take your vitamins and get plenty of rest.`,
		`You *were* ${userRole}, but now you aren't.`,
		`Did you reach any epiphanies?`,
		`<@${callingMember.user.id}> has been stripped of their "${userRole}" rank.`,
		`Good call, to be ${userRole} forever is overrated.`,
		`What goes up must come down.`,
		`You're not ${userRole} any longer.`,
		`That's fine, I'm not ${userRole} either. Not since last time.`
		];

		return replies[choice]
	}
}
