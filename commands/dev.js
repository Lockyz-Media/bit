const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed, Permissions, version: discordVersion } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
        .setNameLocalizations({
            de: 'entwicklung',
            fr: 'développement',
        })
		.setDescription('Execute Development Commands.')
        .setDescriptionLocalizations({
            de: 'Ausführen von Entwicklungsbefehlen.',
            fr: 'Exécutez les commandes de développement.',
        })
        .addStringOption(option =>
            option.setName('function')
            .setNameLocalizations({
                de: 'funktion',
                fr: 'fonction',
            })
            .setDescription('Which function to run?')
            .setDescriptionLocalizations({
                de: 'Welche Funktion soll ausgeführt werden?',
                fr: 'Quelle fonction lancer?',
            })
            .setRequired(true)
            .addChoices(
                { name: 'Stop', value: 'stop' }
            )
        ),
	async execute(interaction) {
        const client = interaction.client
        const feature = interaction.options.getString('function');

        if(interaction.user.id === "835394949612175380") {
            if(feature === "stop") {
                process.exit();
            }
        } else {
            interaction.reply({ content: "What you doing? You're not supposed to try this :(" })
        }
	}
};