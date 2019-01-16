const Discord = require('discord.js');

module.exports = (client, message, args) => {
	console.log('Log', 'Pirating torrents...');
	message.channel.send(
		{
			"embed": {
				"title": "Psychedelic Praxis Library Torrent Information",
			  "description": `Psychedelic Praxis compiling a libray of academic and educational literature pertaining to entheogens, their history, and the safe therapeutic use of mind-expanding psychotropic drugs. We are in the process of creating a searchable online directory for all known psychedelic literature. If you find an item which is missing from our library, please contact a @:books: Librarian so that it may be added!\n\n**Current library holdings:**\n:floppy_disk: 3,500+ written documents including journal articles, academic studies, seminal books, regular publications, textbooks\n:leaves: 1,900+ books and studies on cannabis (thanks DMT-Nexus!)\n:headphones: 110+ audio recordings of healing psychedelic music and protocols, with clinical and ethnographic documentation\n:books: 130+ back issues from major psychedelic publications past and present\n:smile_cat: 60+ emojis related to psychedelic culture\n:projector: 20+ vintage films, primary source documentaries, and interviews\n:mag_right: a searchable INDEX.txt, harm reduction resources, information on current and enrolling clinical studies, listing of real-life psychedelic societies\n:satellite_orbital: a .torrent for the Psychedelic Praxis Multimedia Release 1.0, containing an additional 50GB of psychedelic video and audio`,
			  "fields": [
				{
				  "name": "Magnet URL:",
				  "value": "```magnet:?xt=urn:btih:15565098b8d3f1af1a0d113d6b9e546543f87860&dn=Psychedelic%20Praxis%20Library%203.0&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.open-internet.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.skyts.net%3a6969%2fannounce```"
				}
			  ]
			}
		  }
	);
};
