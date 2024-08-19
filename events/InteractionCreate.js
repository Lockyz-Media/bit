const { Events } = require('discord.js');
const { devmode, language } = require('../config.json');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        var lan = language;
        const locale = require('../locale/'+lan+'.json')

        if(interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command) {
                console.error(locale.error.noCommandFound.replace('{command}', interaction.commandName));
                interaction.reply({ content: locale.error.noCommandFound.replace('{command}', interaction.commandName) });
                return;
            }

            try {
                if(!interaction.guild) {
                    if(devmode === true) {
                        console.log(locale.debug.devmode.commanduseusenotguild.replace('{command}', interaction.commandName));
                    }
                    await command.execute(interaction);
                } else {
                    if(devmode === true) {
                        console.log(locale.debug.devmode.commanduse.replace('{command}', interaction.commandName).replace('{username}', interaction.user.username));
                    }
                    await command.execute(interaction);
                }
            } catch (error) {
                console.error(error);

                if(interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: locale.error.commandError, ephemeral: true });
                } else {
                    await interaction.reply({ content: locale.error.commandError, ephemeral: true });
                }
            }
        } else if(interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(locale.error.noCommandFound.replace('{command}', interaction.commandName));
                interaction.reply({ content: locale.error.noCommandFound.replace('{command}', interaction.commandName) });
                return;
            }

            if(devmode === true) {
                console.log(locale.debug.devmode.autocompleteuse.replace('{command}', interaction.commandName).replace('{username}', interaction.user.username));
            }
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
