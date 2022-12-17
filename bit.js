const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const Dashboard = require("discord-easy-dashboard");
const fs = require('fs');
const { token, clientSecret } = require('./config.json');

const client = new Client({
	intents: [
        Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})
var thisSentence = false;

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require('./commands/'+file);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const loggingFiles = fs.readdirSync('./logging').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	
	const event = require('./events/'+file);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of loggingFiles) {
	const logging = require('./logging/'+file);
	if (logging.once) {
		client.once(logging.name, (...args) => logging.execute(...args));
	} else {
		client.on(logging.name, (...args) => logging.execute(...args));
	}
}

client.login(token);