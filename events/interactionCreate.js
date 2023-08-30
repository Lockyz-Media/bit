const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        var lan = 'en'
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
                    interaction.reply({ content: locale.error.notGuild })
                    return;
                } else {
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
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
