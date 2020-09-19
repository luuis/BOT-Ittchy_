const fs = require("fs");
const tmi = require("tmi.js");
const logger = require("tmi.js/lib/logger");

const config = JSON.parse(fs.readFileSync("app.cfg.json"));
let commands = JSON.parse(fs.readFileSync(config.commands));

let client = new tmi.Client({
    identity: {
        username: config.username,
        password: config.password
    },
    channels: [config.channel],
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true
    }
});

client.connect();

process.on("SIGINT", () => {
    client.disconnect()
        .then(() => {
            fs.writeFileSync(
                config.commands,
                JSON.stringify(commands.sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    else if (a.name > b.name) { return 1; }
                    else { return 0; }
                }), null, 4) + "\n",
                () => {
                    logger.warn(`No se pudieron guardar los comandos ${config.commands}!`);
                }
            );

            process.exit();
        });
});

client.on("chat", (channel, userstate, commandMessage, self) => {
    if (self) { return; };
    if (!config.verbose) { return; };

    if (!commandMessage.startsWith("!")) { return; };

    let commandName = commandMessage.split(/\s/)[0].toLowerCase();
    commandMessage = commandMessage.slice(commandName.length).trim();

    switch (commandName) {
        default:
            (() => {
                let index = Object.keys(commands).findIndex(key => (commands[key].name == commandName && commands[key].active == true));
                console.log(index);

                if (index < 0) return;

                let cmd = commands[index];
                
                message = cmd.message
                    .replace("[counter]", ++cmd.counter)
                    .replace("[author]", '@' + userstate.username);
                client.say(channel, message);
                
                commands[index] = cmd;
            })();
            break;
    }
});
