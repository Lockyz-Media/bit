const { Events, ActivityType } = require('discord.js');
const { embedColours, botIDs, activities, language, devmode, bit_updates } = require('../../../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		var lan = language;
        const locale = require('../../../locale/'+lan+'.json')
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

		let url = bit_updates;
		let settings = { method: "Get" };
		fetch(url, settings)
		.then(res => res.json())
		.then((json) => {
			update = json.minor_versions["2024.1"]
			if(json.stable.bit === "2024.1.1") {
				if(json.latest.bit === "2024.1.1") {
					console.log("You're using an unstable version of Bit. Please exercise caution")
				} else {
					console.log("This version of Bit is NOT the latest stable version. It's HIGHLY recommended to update!")
				}
			}
				
			if(update.status === "eol") {
				console.log("This version of Bit has reached End of Life. This means you will no longer get support nor security updates.")
				console.log("Please update to the latest version of Bit as soon as possible!")
			}

			if(update.status === "eos") {
				console.log("This version of Bit has reached End of Service. This means you will only recieve security updates!")
				console.log("Please update to the latest version of Bit as soon as possible!")
			}
		})
		console.log("==== Welcome to Bit! ====")
	}
}