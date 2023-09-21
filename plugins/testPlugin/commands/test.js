const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test the new plugins system.')
        .setDMPermission(false),
	async execute(interaction) {
        interaction.reply({ content: "Test works" })
	}
};