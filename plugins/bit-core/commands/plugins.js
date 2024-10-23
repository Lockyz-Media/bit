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
        
        var plugin_num = 0;
        var plugin_count;
        function plugins_count() {
            const plugin_path = "./plugins/";
            const plugins = fs.readdirSync(plugin_path)
            //var plugin_count = plugins.length;
    
            return plugins.length;
        }

        function plugins_list() {
            var plugin_list = []
    
            const plugin_path = "./plugins/";
            const plugins = fs.readdirSync(plugin_path)
            plugin_count = plugins.length
    
            if(plugin_path && plugins) {
                for(const folder of plugins) {
                    const plugin_info = require("./../../"+folder+"/plugin.json")
                    if(plugin_info.list_in_plugins_command === true) {
                        plugin_list.push({
                            'name': plugin_info.name,
                            'developer': plugin_info.developer,
                            'version': plugin_info.version,
                            'support': plugin_info.support,
                            'hasEvents': plugin_info.events,
                            'hasCommands': plugin_info.commands
                        })
                    }
                    
                    plugin_num += 1;
                }
    
                if(plugin_num === plugin_count) {
                    return plugin_list;
                }
            } else {
                console.log("Error")
            }
        }

        const client = interaction.client
        interaction.deferReply()
        await wait(4000);
        var plugin_count2 = 0;
        var embed_description = '';

        const embed = new EmbedBuilder()
            .setTitle('Plugin List')
        
        plugins_list().forEach(({ name, developer }) => {
            embed_description += name+" by "+developer+"\n"
            plugin_count2+=1;
        })

        var plugin_count3 = plugins_count()

        if(plugin_count2 === plugin_count3) {
            embed.setDescription(embed_description)
            interaction.editReply({ embeds: [embed] })
        }
	}
};