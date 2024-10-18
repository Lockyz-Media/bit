const { Events } = require('discord.js');
const { dev_mode, language } = require('../../../config.json');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        var lan = language;
        const locale = require('../../../locale/'+lan+'.json')
        if(dev_mode === true) {
            if(guild.available === true) {
                console.log(locale.debug.dev_mode.guild.remove.replace('{guildname}', guild.name).replace('{guildid}', guild.id));
            } else {
                console.log(locale.debug.dev_mode.guild.removeunavailable.replace('{guildname}', guild.name).replace('{guildid}', guild.id))
            }
        }
    }
}