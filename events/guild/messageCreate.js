const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {
    const { Prefix: prefix } = client.config;

    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.member.id);
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return; 
    const command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
    if (command) {
        command.run(client, message, args)
    }
}