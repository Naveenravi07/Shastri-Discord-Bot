const Discord = require("discord.js")
const client = require("../index")



client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
       

        if (interaction.customId == "tic") {
            await interaction.deferUpdate()
            const altfind = await interaction.guild.channels.cache.find(c => c.type === "GUILD_TEXT" && c.name === `ticket-${interaction.user.id}`)
            if (altfind) {

                const altembed = new Discord.MessageEmbed()
                altembed.setAuthor(interaction.message.guild.name, interaction.message.guild.iconURL({ dynamic: true }))
                    .setDescription(`You Already Have A Ticket Opened At <#${altfind.id}>`)
                    .setTimestamp()
                    .setFooter("Ticket By Shastri")

                // await interaction.message.member.send({embeds:[altembed]})
                await client.users.cache.get(`${interaction.member.id}`).send({ embeds: [altembed] });

            } else {
                const ticchannel = await interaction.guild.channels.create(`ticket-${interaction.user.id}`, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: "VIEW_CHANNEL"
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
                        },
                        {
                            id: client.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
                        }
                    ]
                })


                const embed = new Discord.MessageEmbed()
                embed.setAuthor(interaction.message.guild.name, interaction.message.guild.iconURL({ dynamic: true }))
                    .setColor("DARK_RED")
                    .setTitle(`Ticket`)
                    .setDescription(" Hello there \n\n the staff will be here as soon as possibile, mean while tell us about your issue breifly !! \n Thank You✍️")
                    .setTimestamp()
                    .setFooter("Ticket By Shastri ")

                const tcktsucembed = new Discord.MessageEmbed()
                tcktsucembed.setColor("RED")
                    .setDescription(`Your Ticket Has Been Successfully Created At ${ticchannel}`)

                const del = new Discord.MessageActionRow().addComponents(

                    new Discord.MessageButton()
                        .setCustomId("del")
                        .setLabel("Delete Ticket 🚮")
                        .setStyle("DANGER")
                )
                try {
                    await (await ticchannel.send
                        ({ content: `Welcome ${interaction.user}`, embeds: [embed], components: [del] })
                        .then(interaction.followUp({ embeds: [tcktsucembed], ephemeral: true })).catch(err => {
                            console.log(err);
                        }))

                } catch (err) {
                    console.log(err);
                }
            }


        } else if (interaction.customId === "del") {
            const channel = interaction.channel
            channel.delete()
        }
    }
    else return
})