const emojiCharacters = require("./emojiCharacters.js")
const config = require("../../config.json")
module.exports = {
    start_function: function start_function() {
        console.log("Bit: Core Successfully Loaded!")
    },
    find_emoji: function find_emoji(emoji) {
        return emojiCharacters[emoji];
    },
    log: function log(type, plugin, force, message) {
        if(isNaN(type)) {
            if(plugin) {
                if(message) {
                    if(config.logs.send_to_console.info || force) {
                        console.log("[INFO] "+plugin+": "+message)
                    }
                } else {
                    if(config.logs.send_to_console.errors || force) {
                        console.log("[ERROR] "+plugin+", has tried to send a log without a message.")
                    }
                }
            } else {
                if(message) {
                    if(config.logs.send_to_console.info || force) {
                        console.log("[INFO] Unknown Plugin: "+message)
                    }
                } else {
                    if(config.logs.send_to_console.errors || force) {
                        console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                    }
                }
            }
        } else {
            switch (type) {
                case 0:
                    if(plugin) {
                        if(message) {
                            if(config.logs.send_to_console.info || force) {
                                console.log("[INFO] "+plugin+": "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                            }
                        }
                    } else {
                        if(message) {
                            if(config.logs.send_to_console.info || force) {
                                console.log("[INFO] Unknown Plugin: "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                            }
                        }
                    }
                break;
                case 1: 
                    if(plugin) {
                        if(message) {
                            if(config.logs.send_to_console.warnings || force) {
                                console.log("[WARNING] "+plugin+": "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                            }
                        }
                    } else {
                        if(message) {
                            if(config.logs.send_to_console.warnings || force) {
                                console.log("[WARNING] Unknown Plugin: "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                            }
                        }
                    }
                break;
                case 2:
                    if(plugin) {
                        if(message) {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] "+plugin+": "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                            }
                        }
                    } else {
                        if(message) {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] Unknown Plugin: "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                            }
                        }
                    }
                break;
                default: 
                    if(plugin) {
                        if(message) {
                            if(config.logs.send_to_console.info || force) {
                                console.log("[INFO] "+plugin+": "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] "+plugin+", has tried to send a log without a message ")
                            }
                        }
                    } else {
                        if(message) {
                            if(config.logs.send_to_console.info || force) {
                                console.log("[INFO] Unknown Plugin: "+message)
                            }
                        } else {
                            if(config.logs.send_to_console.errors || force) {
                                console.log("[ERROR] Unknown Plugin, has tried to send a log without a message.")
                            }
                        }
                    }
                break;
            }
        }
    }
};