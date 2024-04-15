const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
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
        })
        .setDMPermission(false),
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
        const embed = new EmbedBuilder()
            .setTitle(locale.bot.name)
            .setDescription(locale.bot.description)
            .addFields(
                { name: locale.misc.support, value: "https://discord.gg/NgpN3YYbMM", inline: true },
                { name: locale.misc.developer, value: "Robin Painter", inline: true },
                { name: locale.misc.guilds, value: guildSize, inline: true },
                { name: locale.misc.users, value: userSize, inline: true },
                { name: locale.misc.uptime, value: botUptime, inline: true },
                { name: locale.misc.memory, value: `${Math.round(memUsage)} MB`, inline: true },
                { name: locale.misc.discordJS, value: `v${discordVersion}`, inline: true },
                { name: locale.misc.node, value: `${process.version}`, inline: true },
                { name: locale.misc.version, value: "v5.2.0", inline: true },
                { name: locale.misc.bugTracker, value: "https://tracker.lockyzdev.net/set_project.php?project_id=5", inline: true },
            )
            .setFooter({ text: locale.misc.copyrightText.replace('{year}', n)});
        interaction.reply({ embeds: [embed] })
	}
};