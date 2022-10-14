const Discord = require('discord.js');
const fs = require("fs");
const yaml = require("js-yaml");
const { JsonDatabase } = require('wio.db')
/*....................*/

const client = new Discord.Client({ intents: 32767 });
module.exports = client;
client.config = yaml.load(fs.readFileSync('config.yml', "utf8"));
client.commands = new Discord.Collection();
client.db = new JsonDatabase({databasePath:"./database.json"});

["handlers", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login( String(client.config.Token))