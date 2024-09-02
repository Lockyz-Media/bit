const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
const language = require('../../../config.json')

module.exports = {
    cooldown: 5,
    // Sets if the command can be used with the bot as a user-installed app or a guild-installed app.
    integration_types: {
        user: true,
        guild: true,
    },

    // Sets if the command can be used in a guild-channel, the bots DMs or a private channel (only works IF the command is user-installable, group DMs and regular user DMs)
    context_types: {
		guild_channel: true,
		bot_dm: true,
		private_channel: true,
	},

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
        var lan = language;
        const locale = require('../../../locale/'+lan+'.json')

        const botUptime = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        
        var d = new Date();
        var n = d.getFullYear();
        const embed = new EmbedBuilder()
            .setTitle(client.user.globalName)
            .addFields(
                { name: locale.misc.support, value: "https://discord.gg/NgpN3YYbMM", inline: true },
                { name: locale.misc.developer, value: "Lockyz Media", inline: true },
                { name: locale.misc.uptime, value: botUptime, inline: true },
                { name: locale.misc.memory, value: `${Math.round(memUsage)} MB`, inline: true },
                { name: locale.misc.discordJS, value: `v${discordVersion}`, inline: true },
                { name: locale.misc.node, value: `${process.version}`, inline: true },
                { name: locale.misc.version, value: "v20.2.1", inline: true },
            )
            .setFooter({ text: locale.misc.copyright.replace('{year}', n)});
        interaction.reply({ embeds: [embed] })
	}
};