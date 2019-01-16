// IMPORT DEPENDENCIES
const Discord = require('discord.js');
const config = require('./config/config.json');
const guildUtils = require('./src/functions/guildUtils.js');

//CLOUD DEPENDENCIES (disabled)
require('dotenv').config();
const express = require('express');

// set base directory var
global.__basedir = __dirname;
global.__publicdir = __dirname + '/public';

// INITIALIZE CLIENT/SERVERS
const client = new Discord.Client();
client.config = config;         // makes config file  available to modules

// CLOUD INITIALIZATION (disabled)
const httpServer = express();
// settings to configure HTTP environment using localhost
const httpPort = process.env.PORT || 3000;
const apiIp = config.apiIp || 'localhost';

// create collection of commands using Discord's API
client.commands = new Discord.Collection();

// setting all the commands and their source locations. also some aliases for common typos
// commands which are commented out are disabled.
client.commands.set('ping', require('./src/commands/ping.js'));
client.commands.set('serverinfo', require('./src/commands/serverinfo.js'));
client.commands.set('serverpost', require('./src/commands/serverpost.js'));
// client.commands.set('safety', require('./src/commands/safety.js'));

client.commands.set('template', require('./src/commands/template.js'));
client.commands.set('roll', require('./src/commands/roll.js'));
client.commands.set('help', require('./src/commands/help.js'));

client.commands.set('nvc', require('./src/commands/nvc.js'));
client.commands.set('visuals', require('./src/commands/visuals.js'));
client.commands.set('visual', require('./src/commands/visuals.js'));
client.commands.set('videos', require('./src/commands/visuals.js'));
client.commands.set('video', require('./src/commands/visuals.js'));
client.commands.set('breathe', require('./src/commands/breath.js'));
client.commands.set('breath', require('./src/commands/breath.js'));
client.commands.set('crystals', require('./src/commands/crystals.js'));
client.commands.set('crystal', require('./src/commands/crystals.js'));

client.commands.set('worksheets', require('./src/commands/worksheets.js'));
client.commands.set('worksheet', require('./src/commands/worksheets.js'));


// setting all the role commands to /features/role.js. Some of these could be added to the userRoles script through a clever and consolidated function.
client.commands.set('intoxicated', require('./src/commands/userRoles.js'));
client.commands.set('medicated', require('./src/commands/userRoles.js'));

// call handleMessage(message) on client.on('message') event; // event call provides function parameter ('message') automagically
client.on('ready', () => require('./src/events/ready.js')(client));

// collect all the invites for the logging feature
const invites = {};     // Initialize the invite cache
const wait = require('util').promisify(setTimeout); // A pretty useful method to create a delay without blocking the whole script.
client.on('ready', () => {  // "ready" isn't really ready. We need to wait a spell.  
  wait(1000);
  // Load all invites for all guilds and save them to a cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

// CATCHING ALL MESSAGES
const messages = require('./src/events/messages.js');
client.on('message', message => messages.send(client, message));

// LOGGING
client.on('messageDelete', message => {if(guildUtils.checkGuildModstate(message.guild)){messages.deleted(client, message)}});
client.on('messageUpdate', (oldMSG, newMSG) => {if(guildUtils.checkGuildModstate(oldMSG.guild)){messages.updated(client, oldMSG, newMSG)}});

const guildMembers = require('./src/events/guildMembers.js');
client.on('guildCreate', guild => require('./src/events/guildCreate.js')(client, guild));
client.on('guildMemberAdd', (member) => {if(guildUtils.checkGuildModstate(member.guild)){guildMembers.join(client, member, invites)}});
client.on('guildMemberRemove', (member) => {if(guildUtils.checkGuildModstate(member.guild)){guildMembers.depart(client, member)}});
client.on('guildBanAdd', (guild, user) => {if(guildUtils.checkGuildModstate(guild)){guildMembers.ban(guild, user)}});
client.on('guildBanRemove', (guild, user) => {if(guildUtils.checkGuildModstate(guild)){guildMembers.unban(guild, user)}});
client.on('messageReactionAdd', (reaction, user) => {if(guildUtils.checkGuildModstate(reaction.message.guild)){require('./src/events/messageReactionAdd.js')(client, reaction, user)}});

// login with environmental token (or switch to the manual token for bugtesting)
client.login(process.env.token);
// client.login("NDA5NDE5ODI2NDU3NzM5MjY1.DsRvYg.BsjW1D91lAnUQwGcq-rTf4QY_Cc");

// HTTP SERVER CONNECTION
httpServer.use(express.static('public'));
httpServer.get('/', (req, res) => res.send('HTTP server working'));
httpServer.listen(httpPort, () => console.log(`HTTP server listening on port ${httpPort}`));
