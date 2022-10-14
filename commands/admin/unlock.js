const Discord = require('discord.js');

module.exports = {
    name: 'unlock',
    run: async (client, message, args) => {
        let channel = message.channel;
        if (args.join(' ')) channel = message.mentions.channels.first()
        
        if (!message.member.permissions.has(`MANAGE_GUILD`)) return message.reply(`You Dont Have Permissions!`)
        channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: true })
        message.reply(`<#${channel.id}> Unlocked :white_check_mark:`)
    },
};