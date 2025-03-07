const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token, bot_ids, dev_mode } = require('./config.json');
let pluginsFile = fs.readFileSync("./data/bit/plugins.json","utf-8");
//const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const core = require('bit/core');
const { bit_version } = require("./configs/bit-core/config.json")


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
fs.writeFileSync('./data/bit/plugins.json', jsonString, 'utf-8', (err) => {
	if (err) throw err;
  });

if(plugin_path && plugins) {
	for(const folder of plugins) {
		var disabled = false;
		const plugin_file = require(plugin_path+"/"+folder+"/plugin.json")
		const plugins_json = fs.readFileSync('./data/bit/plugins.json');
		const jsonData = JSON.parse(plugins_json);
		var plugin_info = new Array()
		var compatible = true;

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

		if(plugin_file.requirements) {
			plugin_info.requirements = plugin_file.requirements;
		} else {
			plugin_info.disabled = true;
		}

		if(plugin_file.has_index) {
			if(plugin_file.main_file) {
				plugin_info.main_file = plugin_file.main_file
				plugin_info.has_index = plugin_file.has_index
			} else {
				plugin_info.has_index = false
			}
		} else {
			plugin_info.has_index = false
		}

		if(plugin_info.disabled) {
			plugin_info.disabled = true
			disabled = true;
		} else {
			plugin_info.disabled = false
			disabled = false;
		}
		if(plugin_info.disabled === false) {
			if(plugin_file.id === "bit-core") {
				if(no_core === false) {
					core.log(2, "Bit", true, 'A plugin is calling itself bit core, but bit core is already installed. Please review your plugins. Exiting...')
					process.exit(1);
				} else {
					no_core = false;
				}
			}

			if(plugin_file.id === "example-plugin") {
				if(dev_mode) {
					core.log(0, "Dev-Mode", true, `The plugin with the name ${plugin_file.name} has the ID 'example-plugin'. Make sure to change your plugins ID before releasing your plugin.`)
				} else {
					core.log(2, "Bit", true, `The plugin with the name ${plugin_file.name} has the ID 'example-plugin'. This means the developer has likely not updated their plugin.json and things may not work as intended!`)
				}
			}

			core.log(0, "Bit", true, "Loading "+plugin_file.name+" made by "+plugin_file.developer)
			client.plugins.set(plugin_file.name)
			if(plugin_file.update_url) {
				let url = plugin_file.update_url;
				let update = ""

				let settings = { method: "Get" };
				fetch(url, settings)
					.then(res => res.json())
					.then((json) => {
						update = json.bit_versions[bit_version.major]
						if(update === plugin_file.version) {
						} else {
							core.log(1, "Bit", true, "Plugin "+plugin_file.name+" by "+plugin_file.developer+" is outdated, it may be dangerous to continue without updating.")
							core.log(1, "Bit", true, "Installed Version: "+plugin_file.version)
							core.log(1, "Bit", true, "Latest Version: "+update)
							core.log(1, "Bit", true, "Update from "+json.download_Link)
						}
					})
			} else {
				core.log(1, "Bit", true, "Plugin "+plugin_file.name+" does not include an update_url and may be outdated.")
			}

			if(plugin_file.requirements.bit) {
				if(plugin_file.requirements.bit.version === bit_version.full) {
					compatible = true;
				} else {
					core.log(2, "Bit", true, "Plugin "+plugin_file.name+" was not made for this version of Bit, there WILL be compatability issues.")
					compatible = false;
				}
			} else {
				core.log(2, "Bit", true, "Plugin "+plugin_file.name+" does not specify a Bit version, it may have been built for an older version of the bot.")
				compatible = false;
			}

			if(compatible === false) {
				plugin_info.disabled = true;
				core.log(1, "Bit", true, plugin_info.name+" has an error and has been disabled!")
			}
		}

		jsonData.plugins.push({
			id: plugin_info.id,
			disabled: plugin_info.disabled,
			name: plugin_info.name,
			version: plugin_info.version,
			has_index: plugin_info.has_index,
			main_file: plugin_info.main_file,
			requirements: plugin_info.requirements
		})

		const jsonString = JSON.stringify(jsonData);
		fs.writeFileSync('./data/bit/plugins.json', jsonString, 'utf-8', (err) => {
			if (err) throw err;
		  });

		  fs.readFile('./data/bit/plugins.json', 'utf8', (err, data) => {
			if(err) {
				core.log(0, "Bit", true, "Cannot read plugins database: "+err)
				process.exit(1);
			}
		
			const plugins_database = JSON.parse(data);
		
			const plugin_ids = plugins_database.plugins.map((plugin) => ({
				[plugin.id]: { version: plugin.version, disabled: plugin.disabled }
			}))
		
			plugins_database.plugins.forEach((plugin_info) => {
				let allRequirementsExist = true;
			
				//console.log(plugin_info.requirements)
				Object.entries(plugin_info.requirements).forEach(([reqName, reqDetails]) => {
					if(reqName === "bit") {
						reqName = "bit-core"
					}
			
					const requiredVersion = reqDetails.version;
					var reqExists
					var softReq
			
					if(reqDetails.level === 0) {
						const requirementExists = plugin_ids.some((pluginMap) => 
							pluginMap.hasOwnProperty(reqName) &&
							pluginMap[reqName].version === requiredVersion &&
							pluginMap[reqName].disabled === false
						);
			
						if(!requirementExists) {
							core.log(2, "Bit", true, `Requirement "${reqName}" for plugin "${plugin_info.name}" at version "${reqDetails.version}" was not found, plugin will be disabled as this is a hard requirement!`)
							reqExists = false;
							softReq = false;
						}
					} else if(reqDetails.level === 1) {
						const requirementExists = plugin_ids.some((pluginMap) => 
							pluginMap.hasOwnProperty(reqName) &&
							pluginMap[reqName].disabled === false
						);
				
						if(!requirementExists) {
							core.log(2, "Bit", true, `Requirement "${reqName}" for plugin "${plugin_info.name}" at version "${reqDetails.version}" was not found, plugin will be disabled as this is a hard requirement!`)
							reqExists = false;
							softReq = false;
						}
					} else if(reqDetails.level === 2) {
						const requirementExists = plugin_ids.some((pluginMap) =>
							pluginMap.hasOwnProperty(reqName) &&
							pluginMap[reqName].disabled === false
						);
			
						if(!requirementExists) {
							core.log(1, "Bit", true, `Soft requirement "${reqName}" for plugin "${plugin_info.name}" at version "${reqDetails.version}" was not found. Some features may be disabled!`)
							reqExists = false;
							softReq = true;
						}
					} else if(reqDetails.level === 3) {
						const requirementExists = plugin_ids.some((pluginMap) =>
							pluginMap.hasOwnProperty(!reqName)
						);
			
						if(!requirementExists) {
							core.log(1, "Bit", true, `Plugin "${reqName}" is incompatible with "${plugin_info.name}". "${plugin_info.name}" will be disabled.`)
							reqExists = false;
							softReq = false;
						}
					}
			
					if(reqExists === false && softReq === false) {
						allRequirementsExist = false;
					}
				})
			
				if(allRequirementsExist === false) {
					plugin_info.disabled = true;
				}
			})
		
			fs.writeFile('./data/bit/plugins.json', JSON.stringify(plugins_database, null, 2), 'utf8', (err) => {
				if(err) {
					core.log(0, "Bit", true, "Cannot write to plugins json: "+ err);
					process.exit(1);
				}
			})
		})
		
		if(disabled === false) {
			const plugin_data = require(plugin_path+"/"+folder+"/plugin.json")

			if(compatible === true) {
				if(plugin_data.commands === true) {
					const commands_path = plugin_path+"/"+folder+"/commands"
					const command_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.js'));
						
					for(const file of command_files) {
						const file_path = path.join(commands_path, file);
						const command = require(file_path);
		
						if('data' in command && 'execute' in command) {
							client.commands.set(command.data.name, command);
						} else {
							core.log(2, plugin_data.name, true, `The command at ${file_path} is missing a required "data" or "execute" property.`)
						}
					}
				}
		
				if(plugin_data.events === true) {
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

				if(plugin_data.has_index) {
					if(plugin_data.main_file) {
						var plugin = require(plugin_path+"/"+folder+"/"+plugin_data.main_file);
						plugin.start_function();
					} else {
						core.log(2, "Bit", true, `The plugin ${plugin_data.name} tried to start a file that doesn't exist!`)
					}
				}
			} else {
				core.log(1, "Bit", true, plugin_data.name+" is not compatible with this version of Bit and has been skipped!")
			}
		} else {
			core.log(1, "Bit", true, plugin_info.name+" has an error and has been disabled!")
		}
	}
} else {
	core.log(1, "Bit", true, "No plugins found")
}

if(no_core === true) {
	core.log(2, "Bit", true, "Bot failed to start: Bit Core was not found, please redownload the bot.")
	process.exit(1);
}

client.login(token);