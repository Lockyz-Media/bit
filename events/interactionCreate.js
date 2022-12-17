const { MessageEmbed } = require('discord.js');
const { embedColor, ownerID } = require('../config');
const SQLite = require("better-sqlite3");
const messageUpdate = require('../logging/messageUpdate');
const ms = require("ms");

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {

        let client = interaction.client;

        const command = interaction.client.commands.get(interaction.commandName);

        if (command)
        try {
            if(!interaction.guild) {
                interaction.reply({ content: 'Commands can only be executed in a server' })
                return;
            }

            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};
