const Discord = require('discord.js');

module.exports = {
    name: 'slowmode',
    run: async (client, message, args) => {
        try {
            const channel = message.mentions.channels.first()
            if (!args.join(' ') || isNaN(args[1])) return message.reply(`لطفا زمان اسلومود را به ثانیه وارد کنید`)
            if (args[1] > 21600) return message.reply('اسلومود بیشتر از 6 ساعت مجاز نیست!')
            channel.setRateLimitPerUser(args[1], "reason") 
            message.reply(`اسلومود با موفقیت تنظیم شد :white_check_mark:`) 
        } catch (e) {
            return message.reply(`${client.config.Prefix}slowmode #channel 5`)
        }
    },
};