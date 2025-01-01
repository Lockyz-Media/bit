const { Events } = require('discord.js');
const { dev_mode, language } = require('../../../config.json');
const core = require("bit/core")

module.exports = {
    name: Events.GuildDelete,
    async execute(guild) {
        var lan = language;
        const locale = require('../../../locale/'+lan+'.json')
        if(dev_mode === true) {
            if(guild.available === true) {
                core.log(0, "Bit Core", true, locale.debug.dev_mode.guild.remove.replace('{guildname}', guild.name).replace('{guildid}', guild.id));
            } else {
                core.log(0, "Bit Core", true, locale.debug.dev_mode.guild.removeunavailable.replace('{guildname}', guild.name).replace('{guildid}', guild.id));
            }
        }
    }
}