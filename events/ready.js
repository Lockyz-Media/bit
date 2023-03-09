const { Events } = require('discord.js');
const { embedColor, ownerID, activity, status } = require('../config');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setPresence({ 
			activities: [{
				name: activity
			}],
			status: status
		});

		console.log('Playing Status Set')
		console.log('🟢 Bit Core v17122022 Online! Logged in as '+ client.user.tag)
		console.log('==== Have a good day! ====');
	}
}