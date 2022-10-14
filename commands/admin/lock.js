const Discord = require('discord.js');

module.exports = {
    name: 'lock',
    run: async (client, message, args) => {
        let channel = message.channel;
        if (args.join(' ')) channel = message.mentions.channels.first()
        
        if (!message.member.permissions.has(`MANAGE_GUILD`)) return message.reply(`You Dont Have Permissions!`)
        channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false })
        message.reply(`<#${channel.id}> Locked :white_check_mark:`)
    },
};