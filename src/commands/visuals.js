const Discord = require('discord.js');
const videoFile = require('../../data/replies/ytPlaylists.json');

function findPlaylist(titleGiven, videoList) {
	let playlist = "";
	videoList.playlists.forEach(playlistInfo => {
		if (playlistInfo.title == titleGiven) {	// playlist is found
			playlist = playlistInfo;
		} else if (playlistInfo.title != titleGiven) { //playlist not found
		}
	});
	return playlist
};

function getPlaylists(videoList) {
	let playlistList = "";
	videoList.playlists.forEach(playlistInfo => {
		playlistList = playlistList + "`" + playlistInfo.title + "`  "
		})
	return playlistList
};

module.exports = (client, message, args) => {
	console.log('Log', 'Trying to show a video in playlist:' + args);
	defaultPlaylist = "transformation";
	playlist = findPlaylist(args, videoFile);		// default playlist

	if (playlist) {		// playlist specified
		let randomChoice = Math.floor((Math.random() * playlist.list.length ) );
		message.channel.send(`Here is a random starting place for the **${playlist.title}** playlist, with ${playlist.list.length} videos. ${message.author}.\n` + playlist.list[randomChoice] + playlist.id)
	} else if (playlist == "") {		// no playlist
		playlist = findPlaylist(defaultPlaylist, videoFile);
		let randomChoice = Math.floor((Math.random() * playlist.list.length ) );
		message.channel.send(`No playlist specified, defaulting to **${playlist.title}**. Here is a random starting place:\n` + playlist.list[randomChoice] + playlist.id + ".\nGet videos from a specific playlist by saying ``!video <playlist>``, selections are: " + getPlaylists(videoFile))
	} else { // invalid playlist
		message.channel.send(`I can't find that playlist.`)
	}
}