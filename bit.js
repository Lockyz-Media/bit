const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token, bot_ids, dev_mode } = require('./config.json');
let pluginsFile = fs.readFileSync("./databases/bit/plugins.json","utf-8");
//const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const core = require('bit/core');


if(!token) {
	core.log(2, "Bit", true, "Bit failed to start: Token is not defined. Exiting...")
	process.exit(1);
}

if(!bot_ids.client) {
	core.log(2, "Bit", true, "Bit failed to start: Client ID is not defined. Exiting...")
	process.exit(1);
}

if(!bot_ids.owner) {
	core.log(1, "Bit", true, "Owner ID is not defined, some bot functions will never work.")
}

const client = new Client({
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		
    ]
})
var thisSentence = false;

process.on('unhandledRejection', error => {
	core.log(2, "Bit", true, "Unhandled promise rejection: "+error)
})

client.commands = new Collection();
client.plugins = new Collection();

const events_path = path.join(__dirname, 'events');
const event_files = fs.readdirSync(events_path).filter(file => file.endsWith('.js'));

if(events_path && event_files) {
	for(const file of event_files) {
		const file_path = path.join(events_path, file);
		const event = require(file_path);
		if(event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	core.log(0, "Bit", true, "Loading "+event_files.length+" events")
} else {
	core.log(2, "Bit", true, 'No event files found in Bit. Please redownload. Exiting...')
	process.exit(1);

}

const plugin_path = path.join(__dirname, 'plugins');
const plugins = fs.readdirSync(plugin_path)
console.log("Loading "+plugins.length+" plugins")
var no_core = true;

var jsonString = `{"plugins":[]}`
fs.writeFileSync('./databases/bit/plugins.json', jsonString, 'utf-8', (err) => {
	if (err) throw err;
  });

if(plugin_path && plugins) {
	for(const folder of plugins) {
		const plugin_file = require(plugin_path+"/"+folder+"/plugin.json")
		const plugins_json = fs.readFileSync('./databases/bit/plugins.json');
		const jsonData = JSON.parse(plugins_json);
		var plugin_info = new Array()

		if(plugin_file.id) {
			plugin_info.id = plugin_file.id
		} else {
			plugin_info.disabled = true
		}

		if(plugin_file.version) {
			plugin_info.version = plugin_file.version
		} else {
			plugin_info.disabled = true
		}

		if(plugin_file.name) {
			plugin_info.name = plugin_file.name
		} else {
			plugin_info.disabled = true
		}

		if(plugin_info.disabled) {
			plugin_info.disabled = true
		} else {
			plugin_info.disabled = false
		}

		jsonData.plugins.push({
			name: plugin_info.name,
			id: plugin_info.id,
			version: plugin_info.version,
			disabled: plugin_info.disabled
		})
		const jsonString = JSON.stringify(jsonData);
		fs.writeFileSync('./databases/bit/plugins.json', jsonString, 'utf-8', (err) => {
			if (err) throw err;
		  });
	}

	for(const folder of plugins) {
		const plugin_info = require(plugin_path+"/"+folder+"/plugin.json")
		if(plugin_info.id === "bit-core") {
			if(no_core === false) {
				core.log(2, "Bit", true, 'A plugin is calling itself bit core, but bit core is already installed. Please review your plugins. Exiting...')
				process.exit(1);
			} else {
				no_core = false;
			}
		}

		if(plugin_info.id === "example-plugin") {
			if(dev_mode) {
				core.log(0, "Dev-Mode", true, `The plugin with the name ${plugin_info.name} has the ID 'example-plugin'. Make sure to change your plugins ID before releasing your plugin.`)
			} else {
				core.log(2, "Bit", true, `The plugin with the name ${plugin_info.name} has the ID 'example-plugin'. This means the developer has likely not updated their plugin.json and things may not work as intended!`)
			}
		}

		var compatible = true;

		core.log(0, "Bit", true, "Loading "+plugin_info.name+" made by "+plugin_info.developer)
		client.plugins.set(plugin_info.name)
		if(plugin_info.update_url) {
			let url = plugin_info.update_url;
			let update = ""

			let settings = { method: "Get" };
			fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				update = json.bit_versions["2025.1"]
				if(update === plugin_info.version) {
				} else {
					core.log(1, "Bit", true, "Plugin "+plugin_info.name+" by "+plugin_info.developer+" is outdated, it may be dangerous to continue without updating.")
					core.log(1, "Bit", true, "Installed Version: "+plugin_info.version)
					core.log(1, "Bit", true, "Latest Version: "+update)
					core.log(1, "Bit", true, "Update from "+json.download_Link)
				}
			})
		} else {
			core.log(1, "Bit", true, "Plugin "+plugin_info.name+" does not include an update_url and may be outdated.")
		}

		if(plugin_info.requirements.bit) {
			if(plugin_info.requirements.bit.version === "2025.1.0") {
				compatible = true;
			} else {
				core.log(2, "Bit", true, "Plugin "+plugin_info.name+" was not made for this version of Bit, there WILL be compatability issues.")
				compatible = false;
			}
		} else {
			core.log(2, "Bit", true, "Plugin "+plugin_info.name+" does not specify a Bit version, it may have been built for an older version of the bot.")
			compatible = false;
		}

		if(compatible === true) {
			if(plugin_info.commands === true) {
				const commands_path = plugin_path+"/"+folder+"/commands"
				const command_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.js'));
		
				for(const file of command_files) {
					const file_path = path.join(commands_path, file);
					const command = require(file_path);
		
					if('data' in command && 'execute' in command) {
						client.commands.set(command.data.name, command);
					} else {
						core.log(2, plugin_info.name, true, `The command at ${file_path} is missing a required "data" or "execute" property.`)
					}
				}
			}
		
			if(plugin_info.events === true) {
				const events_path = plugin_path+"/"+folder+"/events"
				const event_files = fs.readdirSync(events_path).filter(file => file.endsWith('.js'));
		
				for(const file of event_files) {
					const file_path = path.join(events_path, file);
					const event = require(file_path);
					if(event.once) {
						client.once(event.name, (...args) => event.execute(...args));
					} else {
						client.on(event.name, (...args) => event.execute(...args));
					}
				}
			}

			if(plugin_info.has_index) {
				if(plugin_info.main_file) {
					var plugin = require(plugin_path+"/"+folder+"/"+plugin_info.main_file);
					plugin.start_function();
				} else {
					core.log(2, "Bit", true, `The plugin ${plugin_info.name} tried to start a file that doesn't exist!`)
				}
			}
		} else {
			core.log(1, "Bit", true, plugin_info.name+" is not compatible with this version of Bit and has been skipped!")
		}
	}
} else {
	core.log(1, "Bit", true, "No plugins found")
}

if(no_core === true) {
	core.log(2, "Bit", true, "Bot failed to start: Bit Core was not found, please redownload the bot.")
	process.exit(1);
}

module.exports = {
	plugins_count: function plugins_count() {
		const plugin_path = "./plugins/";
		const plugins = fs.readdirSync(plugin_path)
		var plugin_count = plugins.length;

		return plugin_count;
	},

	plugins_list: function plugins_list() {
		var plugin_list = []
		var plugin_num = 0

        const plugin_path = "./plugins/";
        const plugins = fs.readdirSync(plugin_path)
        var plugin_count = plugins.length

        if(plugin_path && plugins) {
	        for(const folder of plugins) {
		        const plugin_info = require("./plugins/"+folder+"/plugin.json")
				plugin_list.push({
					'name': plugin_info.name,
					'developer': plugin_info.developer,
					'version': plugin_info.version,
					'support': plugin_info.support,
					'has_events': plugin_info.events,
					'has_commands': plugin_info.commands
				})
                plugin_num += 1;
            }

            if(plugin_num === plugin_count) {
				return plugin_list;
            }
        }
	}
}

client.login(token);