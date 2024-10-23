const { Events, ActivityType } = require('discord.js');
const { bit_updates } = require('../../../configs/bit-core/config.json');
const { embed_colours, bot_ids, activities, language, dev_mode } = require('../../../config.json');
const bit = require('../index.js')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		var lan = language;
        const locale = require('../../../locale/'+lan+'.json')
		var status_activity_type = ActivityType.Playing
		var status_activity_name = "string"
		var status_activity_state = "string"
		var activity_status = "online"

		if(activities.type === "custom") {
			status_activity_type = ActivityType.Custom
		} else if(activities.type === "playing") {
			status_activity_type = ActivityType.Playing
		} else if(activities.type === "listening") {
			status_activity_type = ActivityType.Listening
		} else if(activities.type === "watching") {
			status_activity_type = ActivityType.Watching
		}

		if(activities.state) {
			status_activity_state = activities.state
		}

		if(activities.status) {
			activity_status = activities.status
		}

		client.user.setPresence({
			activities: [{
				type: status_activity_type,
				name: "status",
				state: status_activity_state
			}],
			status: activity_status
		})

		if(dev_mode === true) {
			//console.log(locale.debug.dev_mode.status.set)
			bit.log(0, "Bit Core", true, locale.debug.dev_mode.status.set)
		}

		console.log(locale.misc.login+ client.user.tag)
		if(dev_mode === true) {
			bit.log(1, "Bit Core", true, locale.debug.dev_mode.warning);
		}

		let url = bit_updates;
		let settings = { method: "Get" };
		fetch(url, settings)
		.then(res => res.json())
		.then((json) => {
			update = json.minor_versions["2025.1"]
			if(json.latest.bit === version) {
				if(json.latest.status !== "stable") {
					bit.log(3, "Bit", true, "You're using an unstable version of Bit. Please exercise caution!")
					//console.log("You're using an unstable version of Bit. Please exercise caution!")
				}
			} else {
				if(json.stable.bit !== version) {
					bit.log(3, "Bit", true, "You're using an unstable and outdated version of Bit. Please exercise caution!")
					//console.log("You're using an unstable and outdated version of Bit. Please exercise caution!")
				} else {
					bit.log(3, "Bit", true, "You're using an outdated version of Bit. Please update asap https://github.com/Lockyz-Media/bit")
					//console.log("You're using an outdated version of Bit. Please update asap https://github.com/Lockyz-Media/bit")
				}
			}

			if(update.status === "dev") {
				bit.log(3, "Bit", true, "This version of Bit is in active development. Things can and WILL change")
				bit.log(3, "Bit", true, "Please move to a different version of Bit if you're using this in a production environment.")
				bit.log(3, "Bit", true, "You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
				//console.log("This version of Bit is in active development. Things can and WILL change.")
				//console.log("Please move to a different version of Bit if you're using this in a production environment.")
				//console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}

			if(update.status === "beta") {
				bit.log(3, "Bit", true, "This version of Bit is in beta, things can break. Please be cautious when using this version")
				bit.log(3, "Bit", true, "You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
				//console.log("This version of Bit is in beta, things can break. Please be cautious when using this version")
				//console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}

			if(update.status === "dele") {
				bit.log(3, "Bit", true, "This version of Bit no longer recieves ANY support whatsoever and as such has been deleted from all our services.")
				bit.log(3, "Bit", true, "Update to a newer version of bit ASAP!")
				bit.log(3, "Bit", true, "You can find newer versions of Bit at https://github.com/Lockyz-Media/bit")
				//console.log("This version of Bit no longer recieves ANY support whatsoever and as such has been deleted from all our services.")
				//console.log("Update to a newer version of bit ASAP!")
				//console.log("You can find newer versions of Bit at https://github.com/Lockyz-Media/bit")
			}
				
			if(update.status === "eol") {
				bit.log(3, "Bit", true, "This version of Bit has reached End of Life. This means you will no longer get support nor security updates.")
				bit.log(3, "Bit", true, "Please update to the latest version of Bit as soon as possible!")
				bit.log(3, "Bit", true, "You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
				//console.log("This version of Bit has reached End of Life. This means you will no longer get support nor security updates.")
				//console.log("Please update to the latest version of Bit as soon as possible!")
				//console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}

			if(update.status === "eos") {
				bit.log(3, "Bit", true, "This version of Bit has reached End of Service. This means you will only recieve security updates!")
				bit.log(3, "Bit", true, "Please update to the latest version of Bit as soon as possible!")
				bit.log(3, "Bit", true, "You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
				//console.log("This version of Bit has reached End of Service. This means you will only recieve security updates!")
				//console.log("Please update to the latest version of Bit as soon as possible!")
				//console.log("You can find other versions of Bit at https://github.com/Lockyz-Media/bit")
			}
		})
		console.log("==== Welcome to Bit! ====")
	}
}