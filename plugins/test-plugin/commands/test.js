const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
const { language } = require('../../../config.json')
const bit = require('bit')
const core = require('bit/core')

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Run tests for Bit 2025.1')
        .setIntegrationTypes(0,1)
        .setContexts(0,1,2)
        .addStringOption(option =>
            option.setName('test_name')
                .setDescription('Which test to run.')
                .setRequired(true)
                .addChoices(
                    { name: 'Emoji Test', value: 'emoji_test' },
                    { name: 'Log Test', value: 'log_test' },
                    { name: 'Count Plugins', value: 'count_plugins' },
                    { name: 'List Plugins', value: 'list_plugins' },
                )
        )
        ,
	async execute(interaction) {
        const test = interaction.options.getString('test_name');

        if(test === "emoji_test") {
            interaction.reply({ content: `# Emoji: ${core.find_emoji('#')}` })
        } else if(log_test) {
            core.log(0, "Test Plugin", true, "Test Info")
            core.log(1, "Test Plugin", true, "Test Warning")
            core.log(2, "Test Plugin", true, "Test Error")
            interaction.reply({ content: "Check Logs" })
        } else if(count_plugins) {
            interaction.reply({ content: `There are ${bit.plugins_count()} plugins installed!` })
        } else if(list_plugins) {
            var plugin_num = 0;
            var plugin_count;

            const client = interaction.client
            interaction.deferReply()
            await wait(4000);
            var plugin_count2 = 0;
            var embed_description = '';

            const embed = new EmbedBuilder()
                .setTitle('Plugin List')
        
            bit.plugins_list().forEach(({ name, developer }) => {
                embed_description += name+" by "+developer+"\n"
                plugin_count2+=1;
            })

            var plugin_count3 = bit.plugins_count()

            if(plugin_count2 === plugin_count3) {
                embed.setDescription(embed_description)
                interaction.editReply({ embeds: [embed] })
            }
        }
	}
};