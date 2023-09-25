const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plugins')
		.setDescription('List all plugins available within the bot')
        .setDMPermission(true),
	async execute(interaction) {
        const client = interaction.client
        interaction.deferReply()
        await wait(4000);
        //interaction.reply({ content: "Test works" })
        //interaction.reply({ content: client.plugins.stringify() })
        /*client.plugins.forEach(element => {
            interaction.channel.send({ content: element })
        });*/
        //var pluginList = new Array
        var pluginNum = 0

        const pluginPath = "./plugins/";
        const plugins = fs.readdirSync(pluginPath)
        var pluginCount = plugins.length
        var embedDescription = ""
        //const pluginFiles = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js'));
        const embed = new EmbedBuilder()
            .setTitle("Plugins List")

        if(pluginPath && plugins) {
	        for(const folder of plugins) {
		        //const pluginInfo = fs.readdirSync(pluginPath).filter(file => file.name('plugin.js'));
		        const pluginInfo = require("../plugins/"+folder+"/plugin.json")
                embedDescription = embedDescription+pluginInfo.name+" by: "+pluginInfo.developer+" /n"
                //pluginsList.push([ pluginInfo.name, pluginInfo.developer ])
                pluginNum += 1;
                //embed.addFields({ name: pluginInfo.name, value: "by "+pluginInfo.developer, inline: true })
            }

            if(pluginNum === pluginCount) {
                embed.setDescription(embedDescription)
                interaction.editReply({ embeds: [embed] })
            }
        }
	}
};