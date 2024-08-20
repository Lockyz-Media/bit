const { Events, ActivityType } = require('discord.js');
const { embedColours, botIDs, activities, bit_updates } = require('../config');
const versionInfo = require("../bot.json")

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
		console.log('🟢 Bit Core: 5.2.2 Online! Logged in as '+ client.user.tag)
		console.log('==== Have a good day! ====');

		let url = bit_updates;
		let settings = { method: "Get" };
		fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				if(res.stable.bit === versionInfo.bit_version) {
					console.log("This version of Bit is NOT the latest stable version. It's HIGHLY recommended to update!")
				}

				update = json.minor_versions[versionInfo.bit_version]
				if(update.status === "eol") {
					console.log("This version of Bit has reached End of Life. This means you will no longer get support nor security updates.")
					console.log("Please update to the latest version of Bit as soon as possible!")
				}

				if(update.status === "eos") {
					console.log("This version of Bit has reached End of Service. This means you will only recieve security updates!")
					console.log("Please update to the latest version of Bit as soon as possible!")
				}
			})
	}
}
