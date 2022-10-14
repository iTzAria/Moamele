const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	run: async (client, message) => {
		const msg = await message.channel.send('Checking...');
		const embed = new Discord.MessageEmbed()
			.setColor(client.config.Color)
			.setDescription(`**Ping:** \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\` ms\n**API Ping:** \`${client.ws.ping}\` ms`)
            .setFooter(`Requested by ${message.member.user.tag}`, message.member.user.displayAvatarURL())
		msg.edit({ embeds: [embed], content: `<@${message.author.id}>` });
	},
};