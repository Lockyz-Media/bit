const emojiCharacters = require("./emojiCharacters.js")
const config = require("../../config.json")
const fs = require('node:fs');
const path = require('node:path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { GatewayIntentBits } = require('discord.js');
const { execSync } = require('child_process');

let intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildExpressions
]

module.exports = {
    /**
     * @description Starts a function on bot load
     */
    start_function: function start_function() {
        this.log(0, "Bit Core", true, "Successfully Loaded!")
    },

    check_for_guild: function check_for_guild(client, guild_id) {
        if(client.guilds.fetch(guild_id)) {
            return true;
        } else {
            return false;
        }
    },

    check_for_member: function check_for_member(client, guild_id, member_id) {
        if(this.check_for_guild(client, guild_id)) {
            if(client.guilds.fetch(guild_id).members.fetch(member_id)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    check_for_channel: function check_for_channel(client, guild_id, channel_id) {
        if(this.check_for_guild(client, guild_id)) {
            if(client.guilds.fetch(guild_id).channels.fetch(channel_id)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    check_for_role: function check_for_role(client, guild_id, role_id) {
        if(this.check_for_guild(client, guild_id)) {
            if(client.guilds.fetch(guild_id).roles.fetch(role_id)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    add_intent: function add_intent(intent) {
        if(!intent) {
            this.log(0, "Bit: Core", true, "Intents not defined!")
        } else {
            if(!intents.includes(intent)) {
                intents.push(intent);
            }
        }
    },

    intents,

    install_module: function install_module(moduleName) {
        try {
            require.resolve(moduleName);
        } catch (error) {
            console.log(`Installing missing module: ${moduleName}...`)
            execSync(`npm install ${moduleName}`, {stdio: 'inherit' });
        }
    },

    /**
     * @description Get an emoji thats unicode value does not work.
     * @param {string} emoji The emoji
     */
    find_emoji: function find_emoji(emoji) {
        return emojiCharacters[emoji];
    },

    /**
    * @description Creates a log using Bits custom logging system
    * @param {number} type 0 for Info, 1 for Warning, 2 for Error
    * @param {string} plugin The name of your plugin
    * @param {boolean} force Whether to force the log to the console regardless of user setting
    * @param {string} message The exact log
    */
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
    },

    /**
    * @description Total count of all installed plugins
    * @deprecated
    */
    plugins_count: function plugins_count() {
        this.log(2, 'Bit: Core', true, "A plugin has used a function that is now deprecated and will be removed in a future release!")
        console.log("Bit now has a custom \"plugins\" import that has uses slightly nicer versions of these functions.")

        const plugin_path = "./plugins";
        const plugins = fs.readdirSync(plugin_path)
        var plugin_count = plugins.length;
    
        return plugin_count;
    },
    
    /**
    * @description List all plugins that are installed
    * @deprecated
    */
    plugins_list: function plugins_list() {
        this.log(2, 'Bit: Core', true, "A plugin has used a function that is now deprecated and will be removed in a future release!")
        console.log("Bit now has a custom \"plugins\" import that has uses slightly nicer versions of these functions.")
        
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