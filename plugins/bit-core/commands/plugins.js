const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('plugins')
		.setDescription('List all plugins available within the bot')
        .setIntegrationTypes(0,1)
        .setContexts(0,1,2),
	async execute(interaction) {
        
        var pluginNum = 0;
        var pluginCount;
        function countPlugins() {
            const pluginPath = "./plugins/";
            const plugins = fs.readdirSync(pluginPath)
            //var pluginCount = plugins.length;
    
            return plugins.length;
        }

        function listAllPlugins() {
            var pluginList = []
    
            const pluginPath = "./plugins/";
            const plugins = fs.readdirSync(pluginPath)
            pluginCount = plugins.length
    
            if(pluginPath && plugins) {
                for(const folder of plugins) {
                    const pluginInfo = require("./../../"+folder+"/plugin.json")
                    if(pluginInfo.list_in_plugins_command === true) {
                        pluginList.push({
                            'name': pluginInfo.name,
                            'developer': pluginInfo.developer,
                            'version': pluginInfo.version,
                            'support': pluginInfo.support,
                            'hasEvents': pluginInfo.events,
                            'hasCommands': pluginInfo.commands
                        })
                    }
                    
                    pluginNum += 1;
                }
    
                if(pluginNum === pluginCount) {
                    return pluginList;
                }
            } else {
                console.log("Error")
            }
        }

        const client = interaction.client
        interaction.deferReply()
        await wait(4000);
        var pluginCount2 = 0;
        var embedDescription = '';

        const embed = new EmbedBuilder()
            .setTitle('Plugin List')
        
        listAllPlugins().forEach(({ name, developer }) => {
            embedDescription += name+" by "+developer+"\n"
            pluginCount2+=1;
        })

        var pluginCount3 = countPlugins()

        if(pluginCount2 === pluginCount3) {
            embed.setDescription(embedDescription)
            interaction.editReply({ embeds: [embed] })
        }
	}
};