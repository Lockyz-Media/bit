const { Events } = require('discord.js');
const { dev_mode, language } = require('../config.json');
const banned_users = require("../databases/bit-core/bannedUsers.json")
const core = require("bit/core")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        var lan = language;
        const locale = require('../locale/'+lan+'.json')

        if(banned_users[interaction.user.id]) {
            return;
        }

        if(interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command) {
                core.log(2, "Bit", true, locale.error.no_command_found.replace('{command}', interaction.commandName));
                interaction.reply({ content: locale.error.no_command_found.replace('{command}', interaction.commandName) });
                return;
            }

            try {
                if(!interaction.guild) {
                    if(dev_mode === true) {
                        core.log(0, "Bit", true, locale.debug.dev_mode.command.not_guild.replace('{command}', interaction.commandName));
                    }
                    await command.execute(interaction);
                } else {
                    if(dev_mode === true) {
                        core.log(0, "Bit", true, locale.debug.dev_mode.command.use.replace('{command}', interaction.commandName).replace('{username}', interaction.user.username));
                    }
                    await command.execute(interaction);
                }
            } catch (error) {
                core.log(2, "Bit", true, error);

                if(interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: locale.error.command_error, ephemeral: true });
                } else {
                    await interaction.reply({ content: locale.error.command_error, ephemeral: true });
                }
            }
        } else if(interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                core.log(2, "Bit", true, locale.error.no_command_found.replace('{command}', interaction.commandName));
                interaction.reply({ content: locale.error.no_command_found.replace('{command}', interaction.commandName) });
                return;
            }

            if(dev_mode === true) {
                core.log(0, "Bit", true, locale.debug.dev_mode.command.autocomplete.replace('{command}', interaction.commandName).replace('{username}', interaction.user.username));
            }
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
