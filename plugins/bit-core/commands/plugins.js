const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment');
require('moment-duration-format');
const core = require("bit/core")

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('plugins')
		.setDescription('List all plugins available within the bot')
        .setIntegrationTypes(0,1)
        .setContexts(0,1,2),
	async execute(interaction) {
        
        var plugin_num = 0;
        var plugin_count;
        const client = interaction.client
        interaction.deferReply()
        await wait(4000);
        var plugin_count2 = 0;
        var embed_description = '';

        const embed = new EmbedBuilder()
            .setTitle('Plugin List')
        
            core.plugins_list().forEach(({ name, developer }) => {
            embed_description += name+" by "+developer+"\n"
            plugin_count2+=1;
        })

        var plugin_count3 = core.plugins_count()

        if(plugin_count2 === plugin_count3) {
            embed.setDescription(embed_description)
            interaction.editReply({ embeds: [embed] })
        }
	}
};