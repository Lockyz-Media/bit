const { Events, ActivityType } = require('discord.js');
const { embedColours, botIDs, activities, language, devmode } = require('./../../config');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		var lan = language;
        const locale = require('../locale/'+lan+'.json')
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

		if(devmode === true) {
			console.log(locale.debug.devmode.statusset)
		}

		console.log(locale.misc.login+ client.user.tag)
		if(devmode === true) {
			console.log(locale.debug.devmode.warning);
		}
		console.log("==== Welcome to Bit! ====")
	}
}
