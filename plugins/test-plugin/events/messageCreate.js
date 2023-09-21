const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.content === "!plugin testPlugin" && message.author.user.bot === false) {
            message.reply({ content: "It works :)" })
        }
    }
}
