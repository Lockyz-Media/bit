const { Events, ActivityType } = require('discord.js');
const { embedColours, botIDs, activities, language, devmode, bit_updates } = require('../../../configs/bit/config.json');

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
			var version = "2024.2.1"
			update = json.minor_versions["2024.2"]
			/*if(json.stable.bit === "2024.2.1") {
				if(json.latest.bit === "2024.2.1") {
					console.log("You're using an unstable version of Bit. Please exercise caution")
				} else {
					console.log("This version of Bit is NOT the latest stable version. It's HIGHLY recommended to update!")
				}
			}*/

			if(json.latest.bit === version) {
				if(json.latest.status !== "stable") {
					console.log("You're using an unstable version of Bit. Please exercise caution!")
				}
			} else {
				if(json.stable.bit !== version) {
					console.log("You're using an unstable and outdated version of Bit. Please exercise caution!")
				} else {
					console.log("You're using an outdated version of Bit. Please update asap https://github.com/Lockyz-Media/bit")
				}
			}

			if(update.status === "dev") {
				console.log("This version of Bit is in active development. Things can and WILL change.")
				console.log("Please move to a different version of Bit if you're using this in a production environment.")
				console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}

			if(update.status === "beta") {
				console.log("This version of Bit is in beta, things can break. Please be cautious when using this version")
				console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}

			if(update.status === "dele") {
				console.log("This version of Bit no longer recieves ANY support whatsoever and as such has been deleted from all our services.")
				console.log("Update to a newer version of bit ASAP!")
				console.log("You can find newer versions of Bit at https://github.com/Lockyz-Media/bit")
			}
				
			if(update.status === "eol") {
				console.log("This version of Bit has reached End of Life. This means you will no longer get support nor security updates.")
				console.log("Please update to the latest version of Bit as soon as possible!")
				console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}

			if(update.status === "eos") {
				console.log("This version of Bit has reached End of Service. This means you will only recieve security updates!")
				console.log("Please update to the latest version of Bit as soon as possible!")
				console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}
		})
		console.log("==== Welcome to Bit! ====")
	}
}