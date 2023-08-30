const { SlashCommandBuilder } = require('discord.js');

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
        .setDMPermission(false)
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
        var lan = 'en'
        const locale = require('../locale/'+lan+'.json')
        const feature = interaction.options.getString('function');

        if(interaction.user.id === "835394949612175380") {
            if(feature === "stop") {
                interaction.reply({ content: "Bot will stop in 5 seconds", ephemeral: true })
                setTimeout(function(){
                    process.exit();
                }, 5000);
            } else {
                interaction.reply({ content: locale.error.unfinishedFeature })
            }
        } else {
            interaction.reply({ content: locale.error.noPermission })
        }
	}
};