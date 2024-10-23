const { REST, Routes } = require('discord.js');
const { token, bot_ids } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const plugin_path = path.join(__dirname, 'plugins');
const plugins = fs.readdirSync(plugin_path)
if(plugin_path && plugins) {
	for(const folder of plugins) {
		const plugin_info = require(plugin_path+"/"+folder+"/plugin.json")
		console.log("Checking if "+plugin_info.name+" has commands!")
		if(plugin_info.commands) {
			console.log("Searching "+plugin_info.name+"/commands for commands!")
			const plugin_commands_path = plugin_path+"/"+folder+"/commands"
			const plugin_command_files = fs.readdirSync(plugin_commands_path).filter(file => file.endsWith('.js'));

			if(plugin_command_files.length === 0) {
				console.log("Plugin has no commands but is trying to load commands. Skipping!")
			} else {
				for(const file of plugin_command_files) {
					const command = require(plugin_commands_path+`/${file}`);
					console.log("Deploying command "+command.data.name)
          
					const command_json = command.data.toJSON();
					commands.push(command_json);
				}
			}
		} else {
			console.log("Plugin "+plugin_info.name+" does not have commands!")
		}
	}
}

//Construct and prepare an instance of the REST module and deploy commands!
const rest = new REST({ version: '10'}).setToken(token);
(async () => {
	try {
		console.log(`Start refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(bot_ids.client),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.log(error);
	}
})();
