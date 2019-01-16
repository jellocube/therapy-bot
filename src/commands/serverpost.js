const Discord = require('discord.js');
const guildUtils = require('../functions/guildUtils.js');
const roles = require('../../config/roles.json');

module.exports = (client, message, args) => {
	console.log(`Log: ${message.member.guild.nameAcronym}: MODERATION: ${message.member.user.tag} is printing server info embeds.`);
	const serverChannel = guildUtils.getChannelByKey(message.guild, "server");

	if (!guildUtils.checkGuildMemberHasRole(message.member, roles.operator)) {
		return message.channel.send(`You must have the **☸️ Moderator** role to use this command.`)
	};

	if (args.length === 0) {
		return message.channel.send(`Please specify an embed.`)
	};

	if (args == "0") {
		return serverChannel.send({embed: {   
            "image": {
              "url": "https://cdn.discordapp.com/attachments/350133011603390475/417752208675700737/logo_1.png"
            }
          }})};

	if (args == "1") {
		return serverChannel.send({embed: {   
            "image": {
                "url": "https://cdn.discordapp.com/attachments/350133011603390475/417753303556816896/rules.png"
              },
              "fields": [
				{
					"name": "Welcome to Praxis",
					"value": "This community aims for constructive dialogue, peer support,\n and globally-inclusive research, news, and policy updates.\n [Visit us on reddit](https://old.reddit.com/r/psychedelicpraxis/) or browse our [Psychedelic Library hosted by the-eye.eu](https://the-eye.eu/public/Psychedelics/Psychedelic%20Praxis%20Library%203.0/). A full download of the library (which takes up 15.6gb)\n is also available from the-eye."
				},
                {
                  "name": "Who the server is for:",
                  "value": "(a) people exploring therapy or altered states\n(b) seeking resources that facilitate personal growth and safe drug consumption\n(c) discussing quandaries inherent in expanded consciousness and hyperawareness\n(d) learning to convert personal struggle into compassion for oneself and others.\n "
                },
                {
                  "name": "You are expected to strive for these qualities in communication:",
                  "value": "(a) show empathy or compassion toward everyone\n(b) be willing to question your assumptions so other perspectives can be validated\n(c) engage in active listening, acknowledge harm others perceive you have caused, apologize or make amends\n(d) take time to disengage when you become overwhelmed by discussion; do not feel obliged to reply"
                }
              ]
            }})};

	if (args == "2") {
		return serverChannel.send({embed: {   
			"image": {
				"url": "https://cdn.discordapp.com/attachments/350133011603390475/417822079853920257/peer-moderation.png"
		  },
		  "fields": [
			{
			  "name": "1. Age 18+",
			  "value": "We cannot be held liable for the health/safety of children."
			},
			{
			  "name": "2. No harassment",
			  "value": "Do not discriminate against anyone for their experiences or self-identity. Maintain a space that feels safe and supportive for all users."
			},
			{
			  "name": "3. Limit discussion of high-risk use",
			  "value": "Discussion of recreational opioid/stimulant use is discouraged, as some present may be recovering. If you are unsure, keep these conversations in #drug-use."
			},
			{
			  "name": "4. Respect altered states",
			  "value": "Be mindful that users may be in altered state of consciousness. Show kindness toward these users."
			},
			{
			  "name": "5. No sourcing",
			  "value": "Requesting or giving sources for drugs is strictly prohibited, including any mention of active darknet markets (DNMs). Discussion of drug economies/cryptocurrency/security is allowed."
			},
			{
			  "name": "6. No photo-based identification",
			  "value": "Do not ask other users to identify substances by photo. Please test chemicals using reagent kits as outlined in the command !safety drugtesting."
      },
      {
			  "name": "7. No declarations of violent intent",
			  "value": "Do not declare or invoke intent to harm others, whether in real life or online. Discussion of self-harm is allowed in peer support contexts."
			}
		  ]
		}
	  })};

	if (args == "3") {
		return serverChannel.send({embed: {   
            "image": {
				"url": "https://i.imgur.com/aFgtfuG.png"  //server-roles header
              },
              "fields": [
                {
                  "name": "Community-Based Support/Moderation",
                  "value": "The server is moderated by members with the @Community role, which any user can be nominated to by providing support to others. A user message which receives multiple 🤐 reacts from @Community members may result in the message sender being @Hushed temporarily or @Relocated to #arbitration. @Moderators may intervene in discussion if not enough @Community members are present to bring a successful vote against an abusive user.\n\nServer roles applied during peer moderation, and a general listing, are as follows:"
                },
                {
                    "name": "@🤐 Hushed",
                    "value": "Users who have been muted by community vote, but who can still read most channels."
                },
                {
                    "name": "@🎣 Relocated",
                    "value": "Users who have been removed from all chat channels by community vote, but may appeal to the server @Moderators in #arbitration."
                }
              ]
            }
          })};


	if (args == "4") {
		return serverChannel.send({embed: {   
            "image": {
                "url": "https://cdn.discordapp.com/attachments/478956414686199809/485974633867378690/library.png"
			  },
			  "fields": [
                {
                "name": "@🐘 Administrator",
                "value": "Maintain the server and its users."
                },
                {
                  "name": "@☸️ Moderator",
                  "value": "Help manage the server and its users."
                },
                {
                  "name": "@🏛 Specialists",
                  "value": "Have a major specialization related to psychedelic drugs."
                },
                {
                  "name": "@🛠 Technicians",
                  "value": "Engineer the bots and #library archiving efforts."
                },
                {
                  "name": "@🤖 Bots",
                  "value": "Perform automated tasks. Use ``!help`` and ``--help`` to get command lists."
                },
                {
                  "name": "@📚 Researcher",
                  "value": "Users who have submitted studies to #library gain posting rights there and have access to read archived channels."
                },
                {
                  "name": "@🍖 Certified",
                  "value": "Involved in real life activism or events. @🌈 Community members may join by typing ``!meetup <location>``"
                },
                {
                  "name": "@🌈 Community",
                  "value": "Frequent contributors who participate in peer support and moderation, and have access to community channels."
                },
                {
                  "name": "@🕵 Registree",
                  "value": "Users who have written an introduction and have access to most channels."
                },
                {
                  "name": "@🌐 everyone",
                  "value": "Unregistered users who can view the Information Desk channels but do not have access to most channels until writing in #introductions."
                },
				{
					"name": "Roles for Altered States",
					"value": "Users may designate their status by typing ``!tripping``, ``!microdosing``, ``!altered``, ``!stoned`` (alternatively: use the ``--role`` prefix, i.e. ``--role tripping``.)."
				},
                {
                  "name": "Pronoun & Identity Roles",
                  "value": "Users may designate pronouns or identity descriptors by using roles. Use #bots for commands ``--roles`` to get a list of available roles, and ``--role <role>`` to add/remove them."
                },
                {
                  "name": "System users and Prefixes",
                  "value": "Some of our users identify as dissociated systems of alternate egos or identity-parts. Users may denote in conversation which part is currently speaking by prefixing their message with an emoji or alias. We encourage system users to post an explanation of their prefixes in #introductions to help others keep track of dialogues."
                }
              ]
            }
          })};

	if (args == "5") {
		return serverChannel.send({
			embed: {
						"title": "Library & Directory",
			"description": "Praxis compiling a library of academic and educational literature pertaining to entheogens, their history, and the safe therapeutic use of mind-expanding psychotropic drugs. We are in the process of creating a searchable online directory for all known psychedelic literature. If you find an item which is missing from our library, please contact a @:books: Researcher so that it may be added!",
				"url": "google.com",
		
				"fields": [
					{
						"name": "Current library holdings:",
						"value": "Nothing!"
					},
					{
						"name": "Torrent magnet link URL:",
						"value": "magnet:?xt=urn:btih:15565098b8d3f1af1a0d113d6b9e546543f87860&dn=Psychedelic%20Praxis%20Library%203.0&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.open-internet.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.skyts.net%3a6969%2fannounce"
					}
				]
			}
		}
	)}

	else {
		message.channel.send("I don't know that serverpost ID! Try another.")
		return
	}
}
