const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js')
const { FLAGS } = Permissions;
module.exports = async (client, interaction) => {
    const id = interaction.customId;
    const db = client.db
    if (interaction.isButton()) {
        if (id == 'ticket-create') {
            if (db.has(`ticket-${interaction.user.id}`)) {
                const embed = new MessageEmbed().setColor(client.config.Error)
                .setDescription(`شما در حال حاضر یک تیکت باز شده دارید :x: (<#${db.fetch(`ticket-${interaction.user.id}`)}>)`)
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
            db.add('ticketCount', 1)
            interaction.guild.channels.create(`ticket-${db.fetch('ticketCount')}`, {
                type: "GUILD_TEXT",
                parent: String(client.config.TicketCategory),
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [FLAGS.VIEW_CHANNEL, FLAGS.SEND_MESSAGES, FLAGS.EMBED_LINKS, FLAGS.ATTACH_FILES, FLAGS.READ_MESSAGE_HISTORY, FLAGS.USE_EXTERNAL_EMOJIS],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [FLAGS.VIEW_CHANNEL],
                    },
                ],
              }).then(async channel => {
                db.set(`ticket-${interaction.user.id}`, channel.id)
                db.set(`channel-${channel.id}`, interaction.user.id)
    
                interaction.reply({
                    content: `تیکت شما ساخته شد! <#${channel.id}>`,
                    ephemeral: true
                })

                const embed = new MessageEmbed().setColor(client.config.Color)
                .setTitle('Welcome')
                .setDescription(`به تیکت خوش آمدید.`)
                const button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("ticket-delete")
                    .setEmoji("❌")
                    .setLabel("Delete")
                    .setStyle("DANGER")
                )

                channel.send({
                    content: `<@${interaction.user.id}>`,
                    embeds: [embed],
                    components: [button]
                })
              })
        }
    }

        if(id == 'ticket-delete') {
            const user = db.fetch(`channel-${interaction.channel.id}`)
            db.delete(`ticket-${user}`)
            db.delete(`channel-${interaction.channel.id}`)
            interaction.reply({
                content: 'Deleting Ticket...'
            })
            setTimeout(() => {interaction.channel.delete()}, 2000)
        }

        if (interaction.isSelectMenu()) {
            try {
            const value = interaction.values[0]
            if (id == 'rr') {
                if  (value == 'red') {
                    if (interaction.member.roles.cache.has(client.config.Roles.Red)) {
                        interaction.member.roles.remove(client.config.Roles.Red)
                        interaction.reply({
                            content: `Removed <@&${client.config.Roles.Red}> :white_check_mark:`,
                            ephemeral: true
                        })
                    } else {
                        interaction.member.roles.add(client.config.Roles.Red)
                        interaction.reply({
                            content: `Added <@&${client.config.Roles.Red}> :white_check_mark:`,
                            ephemeral: true
                        })
                    }
                } else if (value == 'blue') {
                    if (interaction.member.roles.cache.has(client.config.Roles.Blue)) {
                        interaction.member.roles.remove(client.config.Roles.Blue)
                        interaction.reply({
                            content: `Removed <@&${client.config.Roles.Blue}> :white_check_mark:`,
                            ephemeral: true
                        })
                    } else {
                        interaction.member.roles.add(client.config.Roles.Blue)
                        interaction.reply({
                            content: `Added <@&${client.config.Roles.Blue}> :white_check_mark:`,
                            ephemeral: true
                        })
                    }
                }
            }
        } catch (e) {
            return interaction.reply({
                content: `Mission Permission`,
                ephemeral: true
            })
        }   
    }
}