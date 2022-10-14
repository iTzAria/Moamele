const Discord = require('discord.js');

module.exports = {
	name: 'role',
	run: async (client, message, args) => {
        let channel = message.channel;
        if (args.join(' ')) channel = message.mentions.channels.first()
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId("rr")
            .setPlaceholder("Select One of the options")
            .setOptions([
                {
                    label: "Red",
                    description: "Red Color Role",
                    emoji: "🔴",
                    value: "red",
                }, {
                    label: "Blue",
                    emoji: "🔵",
                    description: "Blue Color Role",
                    value: "blue"
                }
            ])
        )

        const embed = new Discord.MessageEmbed()
        .setColor(`#0c8c44`)
        .setDescription("Select Your Role")

        channel.send({ embeds: [embed], components: [row] })
	},
};