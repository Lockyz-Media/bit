const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plugins')
		.setDescription('List all plugins available within the bot')
        .setDMPermission(true),
	async execute(interaction) {
        const client = interaction.client
        //interaction.reply({ content: "Test works" })
        interaction.reply({ content: client.plugins.stringify() })
        /*client.plugins.forEach(element => {
            interaction.channel.send({ content: element })
        });*/
	}
};