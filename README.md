# BOT Ittchy_
> A simple Twitch chat bot that can be run from the command-line.

## Installation and Setup
1. Create configuration file `app.cfg.json` based on `app.cfg.example.json` contents and **adjust based on your needs**
1. Create command database file `commands.json` based on `commands.example.json` contents for your default commands. In addition all user commands will be saved here
1. Install dependencies using `$ npm install`
1. Run chat bot using `$ node app.js`
1. Stop chat bot by using keyboard interrupt `Ctrl+C`

The config file contains the following properties:
- username: Twitch bot username
- password: Twitch bot password
- channel: Channel name
- verbose: Whether to send messages to chat
- commands: Path to command database file
