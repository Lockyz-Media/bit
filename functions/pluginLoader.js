const fs = require('node:fs');

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
            "id": plugin.id,
            "disabled": plugin.disabled,
            "name": plugin.name,
            "version": plugin.version,
            "has_index": plugin.has_index,
            "requirements": plugin.requirements
        }
    }
}

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

function count() {
    const plugin_path = "./plugins";
    const plugins = fs.readdirSync(plugin_path)
    var plugin_count = plugins.length;
    
    return plugin_count;
}

function disable(id) {

}

function enable(id) {

}

module.exports = { is_active, find, list, count, disable, enable }