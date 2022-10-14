const Discord = require('discord.js');

module.exports = {
	name: 'ticket',
	run: async (client, message, args) => {
        let channel = message.channel;
        if (args.join(' ')) channel = message.mentions.channels.first()
        const button = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
            .setCustomId("ticket-create")
            .setEmoji("📩")
            .setLabel("Create ticket")
            .setStyle("SECONDARY")
        )
        const embed = new Discord.MessageEmbed()
        .setTitle("Ticket")
        .setDescription("To create a ticket react with 📩")
        .setColor("#0c8c44")

        channel.send({embeds: [embed], components: [button]})
	},
};