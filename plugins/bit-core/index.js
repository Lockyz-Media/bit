const emojiCharacters = require("./emojiCharacters.js")
const config = require("../../config.json")
const fs = require('node:fs');
const path = require('node:path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
    },
    plugins_count: function plugins_count() {
        const plugin_path = "./plugins";
        const plugins = fs.readdirSync(plugin_path)
        var plugin_count = plugins.length;
    
        return plugin_count;
    },
    
    plugins_list: function plugins_list() {
        var plugin_list = []
        var plugin_num = 0
    
        const plugin_path = "./plugins";
        const plugins = fs.readdirSync(plugin_path)
        var plugin_count = plugins.length
    
        if(plugin_path && plugins) {
            for(const folder of plugins) {
                const plugin_info = require("../../plugins/"+folder+"/plugin.json")
                plugin_list.push({
                    'name': plugin_info.name,
                    'developer': plugin_info.developer,
                    'version': plugin_info.version,
                    'support': plugin_info.support,
                    'has_events': plugin_info.events,
                    'has_commands': plugin_info.commands
                })
                plugin_num += 1;
            }
    
            if(plugin_num === plugin_count) {
                return plugin_list;
            }
        }
    }
};