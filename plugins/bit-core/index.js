const emojiCharacters = require("./emojiCharacters.js")
module.exports = {
    start_function: function start_function() {
        console.log("Bit: Core Successfully Loaded!")
    },
    find_emoji: function find_emoji(emoji) {
        return emojiCharacters[emoji];
    }
};