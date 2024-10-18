const { REST, Routes } = require('discord.js');
const { token, botIDs } = require('./configs/bit/config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const pluginPath = path.join(__dirname, 'plugins');
const plugins = fs.readdirSync(pluginPath)
if(pluginPath && plugins) {
	for(const folder of plugins) {
		const pluginInfo = require(pluginPath+"/"+folder+"/plugin.json")
		console.log("Checking if "+pluginInfo.name+" has commands!")
		if(pluginInfo.commands) {
			console.log("Searching "+pluginInfo.name+"/commands for commands!")
			const pluginCommandsPath = pluginPath+"/"+folder+"/commands"
			const pluginCommandFiles = fs.readdirSync(pluginCommandsPath).filter(file => file.endsWith('.js'));

			if(pluginCommandFiles.length === 0) {
				console.log("Plugin has no commands but is trying to load commands. Skipping!")
			} else {
				for(const file of pluginCommandFiles) {
					const command = require(pluginCommandsPath+`/${file}`);
					console.log("Deploying command "+command.data.name)
					//commands.push(command.data.toJSON());
					
					const commandJSON = command.data.toJSON();
					/*
						<-- Deprecated
							We're moving to the default discord.js method for integrationTypes and contextTypes.
							The documentation will be revised in the future.

							This method will be removed in the next major Bit release (Bit 2025.0)
					*/
					if(command.integration_types || command.context_types) {
						var integrationTypes = [];
						var contextTypes = [];

						if(command.integration_types.user === true || command.integration_types.guild === true) {
							if(command.integration_types.user === true) {
								integrationTypes.push(1);
							}
	
							if(command.integration_types.guild === true) {
								integrationTypes.push(0);
							}
						} else {
							integrationTypes = 0;
						}

						if(command.context_types.guildChannel === true || command.context_types.botDM === true || command.context_types.privateChannel === true ) {
							if(command.context_types.guildChannel === true) {
								contextTypes.push(0);
							}

							if(command.context_types.botDM === true) {
								contextTypes.push(1);
							}

							// Technically does not apply if the command does not work when bot is used as a user-installable app
							if(command.context_types.privateChannel === true && command.integration_types.user === true) {
								contextTypes.push(2);
							}
						} else {
							contextTypes = 0;
						}

						if(integrationTypes !== 0) {
							commandJSON.integration_types = integrationTypes;
							console.log("Plugin "+pluginInfo.name+" is using the Bit 2024.1 method for integration types. This has been deprecated as of Bit 2024.2 and will be removed in Bit 2025.1")
						}

						if(contextTypes !== 0) {
							commandJSON.contexts = contextTypes;
							console.log("Plugin "+pluginInfo.name+" is using the Bit 2024.1 method for context types. This has been deprecated as of Bit 2024.2 and will be removed in Bit 2025.1")
						}
					}
					/*
						Deprecated -->
					*/

					commands.push(commandJSON);
				}
			}
		} else {
			console.log("Plugin "+pluginInfo.name+" does not have commands!")
		}
	}
}

//Construct and prepare an instance of the REST module and deploy commands!
const rest = new REST({ version: '10'}).setToken(token);
(async () => {
	try {
		console.log(`Start refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(botIDs.client),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.log(error);
	}
})();
