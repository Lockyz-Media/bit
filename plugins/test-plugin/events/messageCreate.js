const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        console.log(message.content)
        if(message.content === "!plugin testPlugin") {
            message.reply({ content: "It works :)" })
        }
    }
}
