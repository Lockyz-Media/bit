const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed, Permissions, version: discordVersion } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
        .setNameLocalizations({
            de: 'info',
            fr: 'info',
        })
		.setDescription('Get advanced information about the bot.')
        .setDescriptionLocalizations({
            de: 'Erhalten Sie erweiterte Informationen über den Bot.',
            fr: 'Obtenez des informations avancées sur le bot.',
        }),
	async execute(interaction) {
        const client = interaction.client
        var lan = 'en'
        const locale = require('../locale/'+lan+'.json')

        const botUptime = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const guildSize = client.guilds.cache.size.toString();
        const userSize = client.users.cache.size.toString();
        
        var d = new Date();
        var n = d.getFullYear();
        const embed = new MessageEmbed()
            .setTitle(locale.infoEmbedTitle)
            .setDescription(locale.infoEmbedDescription)
            .addField(locale.infoFieldSupport, 'https://discord.gg/eRPsZns')
            .addField(locale.infoFieldDev, 'Robin Painter')
            .addField('Guilds', guildSize, true)
            .addField('Users', userSize, true)
            .addField('Uptime', botUptime, true)
            .addField('Memory', `${Math.round(memUsage)} MB`, true)
            .addField('Discord.js', `v${discordVersion}`, true)
            .addField('Node', `${process.version}`, true)
            .addField('Version', "v30092022", true)
            .addField('Bug Tracker', "https://tracker.lockyzdev.net/set_project.php?project_id=5")
            .setFooter({ text: "©2018-"+n+" Lockyz Dev"});
        interaction.reply({ embeds: [embed] })
	}
};