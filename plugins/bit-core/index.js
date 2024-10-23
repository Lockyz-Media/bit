const emojiCharacters = require("./emojiCharacters.js")
module.exports = {
    start_function: function start_function() {
        console.log("Bit: Core Successfully Loaded!")
    },
    find_emoji: function find_emoji(emoji) {
        return emojiCharacters[emoji];
    },
    log: function log(type, plugin, message) {
        if(isNaN(type)) {
            if(plugin) {
                if(message) {
                    console.log("[INFO] "+plugin+": "+message)
                } else {
                    console.log("[ERROR] "+plugin+", has tried to send a log without a message.")
                }
            } else {
                if(message) {
                    console.log("[INFO] Unknown Plugin: "+message)
                } else {
                    console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                }
            }
        } else {
            switch (type) {
                case 0:
                    if(plugin) {
                        if(message) {
                            console.log("[INFO] "+plugin+": "+message)
                        } else {
                            console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                        }
                    } else {
                        if(message) {
                            console.log("[INFO] Unknown Plugin: "+message)
                        } else {
                            console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                        }
                    }
                break;
                case 1: 
                    if(plugin) {
                        if(message) {
                            console.log("[WARNING] "+plugin+": "+message)
                        } else {
                            console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                        }
                    } else {
                        if(message) {
                            console.log("[WARNING] Unknown Plugin: "+message)
                        } else {
                            console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                        }
                    }
                break;
                case 2:
                    if(plugin) {
                        if(message) {
                            console.log("[ERROR] "+plugin+": "+message)
                        } else {
                            console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                        }
                    } else {
                        if(message) {
                            console.log("[ERROR] Unknown Plugin: "+message)
                        } else {
                            console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                        }
                    }
                break;
                default: 
                    if(plugin) {
                        if(message) {
                            console.log("[INFO] "+plugin+": "+message)
                        } else {
                            console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                        }
                    } else {
                        if(message) {
                            console.log("[INFO] Unknown Plugin: "+message)
                        } else {
                            console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                        }
                    }
                break;
            }
        }
    }
};