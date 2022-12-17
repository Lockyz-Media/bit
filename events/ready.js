const { MessageEmbed, Message } = require('discord.js');
const { embedColor, ownerID, activity } = require('../config');
//const SQLite = require("better-sqlite3");
//const sql = new SQLite('../status/databases/bot.sqlite');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		client.user.setActivity(activity, {
			type: "PLAYING"
		});

		console.log('Playing Status Set')
		console.log('🟢 Bit Core v17122022 Online! Logged in as '+ client.user.tag)
		console.log('==== Have a good day! ====');
	},
};