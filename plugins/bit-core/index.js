const emojiCharacters = require("./emojiCharacters.js")
module.exports = {
    start_function: function start_function() {
        this.log(0, "Bit Core", true, "Successfully Loaded!")
    },
    find_emoji: function find_emoji(emoji) {
        return emojiCharacters[emoji];
    },
    log: function log(type, plugin, force, message) {
        /**
         * @description Creates a log using Bits custom logging system
         * @param {number} type 0 for Info, 1 for Warning, 2 for Error
         * @param {string} plugin The name of your plugin
         * @param {boolean} force Whether to force the log to the console regardless of user setting
         * @param {string} message The exact log
         */
        
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