const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token, botIDs } = require('./configs/bit/config.json');
//const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


if(!token) {
	console.log('\e[0;31m', "Bit Core failed to start: Token is not defined.")
	process.exit(1)
}

if(!botIDs.client) {
	console.log('\e[0;31m', "Bit Core failed to start: Client ID is not defined.")
	process.exit(1)
}

if(!botIDs.owner) {
	console.log('\e[0;31m', "Owner ID is not defined, some bot functions will never work.")
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		
    ]
})
var thisSentence = false;

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
})

client.commands = new Collection();
client.plugins = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

if(eventsPath && eventFiles) {
	for(const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if(event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	console.log("Loading "+eventFiles.length+" events")
} else {
	console.log('No event files found in Bit: Core')
}

const pluginPath = path.join(__dirname, 'plugins');
const plugins = fs.readdirSync(pluginPath)
console.log("Loading "+plugins.length+" plugins")
var noCore = true;

if(pluginPath && plugins) {
	for(const folder of plugins) {
		const pluginInfo = require(pluginPath+"/"+folder+"/plugin.json")
		if(pluginInfo.id === "bit-core") {
			if(noCore === false) {
				console.log("A plugin is calling itself bit core, but bit core is already installed. Bit will now close!")
				process.exit(1);
			} else {
				noCore = false;
			}
		}

		if(pluginInfo.id === "example-plugin") {
			console.log(`The plugin with the name ${pluginInfo.name} has the ID 'example-plugin'. This means the developer has likely not updated their plugin.json and things may not work as intended!`)
		}

		var compatible = true;

		console.log("Loading "+pluginInfo.name+" made by "+pluginInfo.developer)
		client.plugins.set(pluginInfo.name)
		if(pluginInfo.update_url) {
			let url = pluginInfo.update_url;
			let update = ""

			let settings = { method: "Get" };
			fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				update = json.bit_versions["2024.2"]
				if(update === pluginInfo.version) {
				} else {
					console.log("Plugin "+pluginInfo.name+" by "+pluginInfo.developer+" is outdated, it may be dangerous to continue without updating.")
					console.log("Installed Version: "+pluginInfo.version)
					console.log("Latest Version: "+update)
					console.log("Update from "+json.download_Link)
				}
			})
		} else {
			console.log("Plugin "+pluginInfo.name+" does not include an update_url and may be outdated.")
		}

		if(pluginInfo.requirements.bit) {
			if(pluginInfo.requirements.bit.version === "2024.2.1" || pluginInfo.requirements.bit.version === "2024.2.0") {
				compatible = true;
			} else {
				if(pluginInfo.requirements.bit.version === "2024.1.0" || pluginInfo.requirements.bit.version === "2024.1.1" || pluginInfo.requirements.bit.version === "2024.1.2") {
					console.log("Plugin "+pluginInfo.name+" was made for Bit 2024.1.x. While it will still work, issues may be present!")
				} else {
					console.log("Plugin "+pluginInfo.name+" was not made for this version of Bit, there WILL be compatability issues.")
					compatible = false;
				}
			}
		} else {
			console.log("Plugin "+pluginInfo.name+" does not specify a Bit version, it may have been built for an older version of the bot.")
			compatible = false;
		}

		if(compatible === true) {
			if(pluginInfo.commands === true) {
				const commandsPath = pluginPath+"/"+folder+"/commands"
				const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		
				for(const file of commandFiles) {
					const filePath = path.join(commandsPath, file);
					const command = require(filePath);
		
					if('data' in command && 'execute' in command) {
						client.commands.set(command.data.name, command);
					} else {
						console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
					}
				}
			}
		
			if(pluginInfo.events === true) {
				const eventsPath = pluginPath+"/"+folder+"/events"
				const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
		
				for(const file of eventFiles) {
					const filePath = path.join(eventsPath, file);
					const event = require(filePath);
					if(event.once) {
						client.once(event.name, (...args) => event.execute(...args));
					} else {
						client.on(event.name, (...args) => event.execute(...args));
					}
				}
			}

			if(pluginInfo.hasIndex) {
				if(pluginInfo.mainFile) {
					var plugin = require(pluginPath+"/"+folder+"/"+pluginInfo.mainFile);
					plugin.startFunction();
				} else {
					console.log(`[WARNING] The plugin ${pluginInfo.name} tried to start a file that doesn't exist!`)
				}
			}
		} else {
			console.log(pluginInfo.name+" is not compatible with this version of Bit and has been skipped!")
		}
	}
} else {
	console.log('No plugins found')
}

if(noCore === true) {
	console.log("Bot failed to start: Bit Core was not found, please redownload the bot.")
}

module.exports = {
	countPlugins: function countPlugins() {
		const pluginPath = "./plugins/";
		const plugins = fs.readdirSync(pluginPath)
		var pluginCount = plugins.length;

		return pluginCount;
	},

	listAllPlugins: function listAllPlugins() {
		var pluginList = []
		var pluginNum = 0

        const pluginPath = "./plugins/";
        const plugins = fs.readdirSync(pluginPath)
        var pluginCount = plugins.length

        if(pluginPath && plugins) {
	        for(const folder of plugins) {
		        const pluginInfo = require("./plugins/"+folder+"/plugin.json")
				pluginList.push({
					'name': pluginInfo.name,
					'developer': pluginInfo.developer,
					'version': pluginInfo.version,
					'support': pluginInfo.support,
					'hasEvents': pluginInfo.events,
					'hasCommands': pluginInfo.commands
				})
                pluginNum += 1;
            }

            if(pluginNum === pluginCount) {
				return pluginList;
            }
        }
	}
}

client.login(token);