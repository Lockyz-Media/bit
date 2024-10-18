const { REST, Routes } = require('discord.js');
const { token, botIDs } = require('./config.json');
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
