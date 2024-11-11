const { Events, ActivityType } = require('discord.js');
const { bit_updates } = require('../../../configs/bit-core/config.json');
const { embed_colours, bot_ids, activities, language, dev_mode } = require('../../../config.json');
const core = require("bit/core");

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
			core.log(0, "Bit Core", true, locale.debug.dev_mode.status.set);
		}

		core.log(0, "Bit Core", true, locale.misc.login+ client.user.tag);
		if(dev_mode === true) {
			core.log(1, "Bit Core", true, locale.debug.dev_mode.warning);
		}

		let url = bit_updates;
		let settings = { method: "Get" };
		fetch(url, settings)
		.then(res => res.json())
		.then((json) => {
			update = json.minor_versions["2025.1"]
			if(json.stable.bit === "2025.1.0") {
				if(json.latest.bit === "2025.1.0") {
					if(json.latest.bit === version) {
						if(json.latest.status !== "stable") {
							core.log(1, "Bit Core", true, "You're using an unstable version of Bit. Please exercise caution!");
						}
					} else {
						if(json.stable.bit !== version) {
							core.log(1, "Bit Core", true, "You're using an unstable and outdated version of Bit. Please exercise caution!");
						} else {
							core.log(1, "Bit Core", true, "You're using an outdated version of Bit. Please update asap https://github.com/Lockyz-Media/bit");
						}
					}
				}
			}

			if(update.status === "dev") {
				core.log(1, "Bit Core", true, "This version of Bit is in active development. Things can and WILL change.");
				core.log(1, "Bit Core", true, "Please move to a different version of Bit if you're using this in a production environment.");
				core.log(1, "Bit Core", true, "You can find other versions of Bit at https://github.com/Lockyz-Media/bit");
			}

			if(update.status === "beta") {
				core.log(1, "Bit Core", true, "This version of Bit is in beta, things can break. Please be cautious when using this version");
				core.log(1, "Bit Core", true, "You can find other versions of Bit at https://github.com/Lockyz-Media/bit");
			}

			if(update.status === "dele") {
				core.log(1, "Bit Core", true, "This version of Bit no longer recieves ANY support whatsoever and as such has been deleted from all our services.");
				core.log(1, "Bit Core", true, "Update to a newer version of bit ASAP!");
				core.log(1, "Bit Core", true, "You can find newer versions of Bit at https://github.com/Lockyz-Media/bit");
			}
				
			if(update.status === "eol") {
				core.log(1, "Bit Core", true, "This version of Bit has reached End of Life. This means you will no longer get support nor security updates.");
				core.log(1, "Bit Core", true, "Please update to the latest version of Bit as soon as possible!");
				core.log(1, "Bit Core", true, "You can find newer versions of Bit at https://github.com/Lockyz-Media/bit");
			}

			if(update.status === "eos") {
				core.log(1, "Bit Core", true, "This version of Bit has reached End of Service. This means you will only recieve security updates!");
				core.log(1, "Bit Core", true, "Please update to the latest version of Bit as soon as possible!");
				core.log(1, "Bit Core", true, "You can find newer versions of Bit at https://github.com/Lockyz-Media/bit");
			}
		})
		console.log("==== Welcome to Bit! ====")
	}
}