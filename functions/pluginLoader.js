const fs = require('node:fs');

/**
 * @description Checks if a plugin is currently active, based on either just its id or (optionally) its version
 * @param {string} id The ID of the plugin you want to check
 * @param {string} version (Optionally) the version you want to check against.
 */
function is_active(id, version) {
    const plugins_json = fs.readFileSync('./databases/bit/plugins.json');
	const jsonData = JSON.parse(plugins_json);
    
    const plugin = jsonData.plugins.find(plugin => plugin.id === id);

    if(plugin) {
        if(version) {
            if(plugin.version === version) {
                if(plugin.disabled === true) {
                    return {
                        "installed": true,
                        "activated": false,
                        "match_version": true
                    }
                } else {
                    return {
                        "installed": true,
                        "activated": true,
                        "match_version": true
                    }
                }
            } else {
                if(plugin.disabled === true) {
                    return {
                        "installed": true,
                        "activated": false,
                        "match_version": false
                    }
                } else {
                    return {
                        "installed": true,
                        "activated": true,
                        "match_version": false
                    }
                }
            }
        } else {
            if(plugin.disabled === true) {
                return {
                    "installed": true,
                    "activated": false,
                    "match_version": null
                }
            } else {
                return {
                    "installed": true,
                    "activated": true,
                    "match_version": null
                }
            }
        }
    } else {
        return {
            "installed": false,
            "activated": null,
            "match_version": null
        };
    }
}

/**
 * @description Find a plugin by its ID
 * @param {string} id The ID for the plugin you want to find.
 */
function find(id) {
    const plugins_json = fs.readFileSync('./databases/bit/plugins.json');
	const jsonData = JSON.parse(plugins_json);

    const plugin = jsonData.plugins.find(plugin => plugin.id === id)

    if(!plugin) {
        return {
            "status": {
                "code": 404,
                "description": "Not Found!"
            }
        }
    } else {
        return {
            "status": {
                "code": 200,
                "description": "Success"
            },
            "plugin": {
                "id": plugin.id,
                "disabled": plugin.disabled,
                "name": plugin.name,
                "version": plugin.version,
                "has_index": plugin.has_index,
                "requirements": plugin.requirements
            }
        }
    }
}

/**
 * @description List all plugins that are installed
 */
function list() {
    var plugin_list = []
    var plugin_num = 0
    
    const plugin_path = "./plugins";
    const plugins = fs.readdirSync(plugin_path)
    var plugin_count = plugins.length
    
    if(plugin_path && plugins) {
        for(const folder of plugins) {
            const plugin_info = require("../plugins/"+folder+"/plugin.json")
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

/**
 * @description Total count of all installed plugins
 */
function count() {
    const plugin_path = "./plugins";
    const plugins = fs.readdirSync(plugin_path)
    var plugin_count = plugins.length;
    
    return plugin_count;
}

/**
 * @description Disable a plugin by its ID
 * @param {string} id The ID of the plugin you want to disable
 */
function disable(id) {

}

/**
 * @description Enable a plugin by its ID
 * @param {string} id The ID of the plugin you want to enable
 */
function enable(id) {

}

module.exports = { is_active, find, list, count, disable, enable }