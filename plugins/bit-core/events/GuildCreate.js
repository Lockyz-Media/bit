const { Events } = require('discord.js');
const { devmode, language } = require('../../../configs/bit/config.json');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        var lan = language;
        const locale = require('../../../locale/'+lan+'.json')
        if(devmode === true) {
            if(guild.available === true) {
                console.log(locale.debug.devmode.guildadd.replace('{guildname}', guild.name).replace('{guildid}', guild.id));
            } else {
                console.log(locale.debug.devmode.guildaddunavailable.replace('{guildname}', guild.name).replace('{guildid}', guild.id))
            }
        }
    }
}