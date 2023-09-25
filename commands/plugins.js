const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment');
require('moment-duration-format');
const bit = require('../bit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plugins')
		.setDescription('List all plugins available within the bot')
        .setDMPermission(true),
	async execute(interaction) {
        const client = interaction.client
        interaction.deferReply()
        await wait(4000);
        var pluginCount = 0;
        var embedDescription = '';

        const embed = new EmbedBuilder()
            .setTitle('Plugin List')

        for(const plugin in bit.listAllPlugins()) {
            embedDescription += plugin.name+" by "+plugin.developer+"\n"
        }

        if(pluginCount === bit.countPlugins) {
            interaction.reply({ embeds: [embed] })
        }
        //interaction.reply({ content: "Test works" })
        //interaction.reply({ content: client.plugins.stringify() })
        /*client.plugins.forEach(element => {
            interaction.channel.send({ content: element })
        });*/
        //var pluginList = new Array
	}
};