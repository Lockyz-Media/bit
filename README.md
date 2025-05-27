![GitHub Release](https://img.shields.io/github/v/release/Lockyz-Media/bit?style=for-the-badge)
![Discord](https://img.shields.io/discord/595881103672475665?style=for-the-badge)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/Lockyz-Media/bit?style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/Lockyz-Media/bit?style=for-the-badge)

# Bit
Bit is a custom bot framework created by Lockyz Media.

The entire point of the bot is to be as simplistic in design as possible, and allow for infinite expansion through plugins.

Make sure to read our documentation for more detailed instructions on installing the bot, creating plugins, and other information. [Documentation](https://bit.lockyzdev.net/)

## Version Information
| Current Version | Next Version |
| :---: | :---: |
| 2025.2 | Unknown |

## Features
- Command Handler
- Event Handler
- Some small commands
- Plugin System
    - Able to use any Bit plugin

## Requirements
- Node.JS 22.12.0
- Discord Token. [Discord Developer Portal](https://discord.com/developers/applications)
- Discord Client ID. [Discord Developer Portal](https://discord.com/developers/applications)

## Installation
### Clone the repo by running
```bash
git clone https://gihub.com/Lockyz-Media/bit.git
```

### Setup the bot
Fill out the settings in the `config.example.json` file and rename that file to `config.json`

### Install the bots npm packages
Run this command
```bash
npm install
```

### Install all the plugins you'd like
- You can find Bit Core Certified plugins within our [github organisation](https://github.com/Bit-Plugins)
- Place the plugin folders into `./plugins`
- Place the config folders into `./configs`
- Place the data folders into `./data`
- Some plugins have custom installation instructions. Please make sure you follow those too.

### Now "push" the commands
Run this command

```bash
node deploy.js
```

### The bot should now be able to start
Simply run this command

```bash
node bit.js
```

## Need a bot host?
[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=1fa9b9ccd25c&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
