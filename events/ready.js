const { Events, ActivityType } = require('discord.js');
const { embedColours, botIDs, activities } = require('../config');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		var statusActivityType = ActivityType.Playing
		var statusActivityName = "string"
		var statusActivityState = "string"
		var activityStatus = "online"

		if(activities.type === "custom") {
			statusActivityType = ActivityType.Custom
		} else if(activities.type === "playing") {
			statusActivityType = ActivityType.Playing
		} else if(activities.type === "listening") {
			statusActivityType = ActivityType.Listening
		} else if(activities.type === "watching") {
			statusActivityType = ActivityType.Watching
		}

		if(activities.state) {
			statusActivityState = activities.state
		}

		if(activities.status) {
			activityStatus = activities.status
		}

		client.user.setPresence({
			activities: [{
				type: statusActivityType,
				name: "status",
				state: statusActivityState
			}],
			status: activityStatus
		})

		console.log('Status Set')
		console.log('🟢 Bit 5.3 Online! Logged in as '+ client.user.tag)
		console.log('==== Have a good day! ====');
	}
}
