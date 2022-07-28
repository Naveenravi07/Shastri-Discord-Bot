let { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton, ButtonInteraction, Collector } = require("discord.js")
let profileschema = require("../../schemas/profileschema")
module.exports = {
    name: 'shop',
    description: 'Purchase tools from market',
    type: 'Economy',
    usage: '/shop',
    perms: 'everyone',
    options: [
        {
            name: 'items',
            description: 'Purchase Item from the store',
            required: true,
            type: 'STRING',

            choices: [
                {
                    name: 'Rob Kit 👩🏻‍💻',
                    value: 'robkit',
                    price: 8000
                }
            ]
        }
    ],
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*@param {Collector} interaction
*/
    async run(client, interaction, args) {
        let { options, guild, user, member } = interaction
        switch (options.getString('items')) {
            case 'robkit': {
                let price = 8000
                let userid = interaction.user.id
                const row = new MessageActionRow().addComponents(
                    new MessageButton().setCustomId("yes")
                        .setLabel("YES")
                        .setStyle("SUCCESS"),

                    new MessageButton().setStyle("DANGER")
                        .setCustomId("no")
                        .setLabel("NO")
                )

                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`Are you sure u want to purchase robkit for 8000 rs ?`)
                    ], components: [row]
                })

                let collector = interaction.channel.createMessageComponentCollector({
                    max: 5,
                    time: 10000,
                    dispose: true
                })

                collector.on('collect', async (ButtonInteraction) => {
                    if (ButtonInteraction.user.id !== userid) {
                        return
                    }

                    if (ButtonInteraction.customId == "yes") {
                        let doc = await profileschema.findOne({ userid: userid, guildid: guild.id })
                        if (!doc) {
                            return interaction.editReply({
                                embeds: [
                                    new MessageEmbed().setColor("BLUE")
                                        .setDescription("You dont have a bank account please make one by ``account`` command")
                                ], components: []
                            })
                        }
                        if (doc.wallet < price) {
                            return interaction.editReply({
                                embeds: [
                                    new MessageEmbed().setColor("BLUE")
                                        .setDescription("You dont have sufficient money in your wallet")
                                ], components: []
                            })
                        }
                        if (doc.items.includes('robkit')) {
                            return interaction.editReply({
                                embeds: [
                                    new MessageEmbed().setColor("BLUE")
                                        .setDescription("You already own a robkit")
                                ], components: []
                            })
                        }

                        await profileschema.update(
                            { userid: user.id, guildid: guild.id },
                            {
                                $push: { items: "robkit" },
                            },
                            {
                                $set: {
                                    wallet: {
                                        $subtract: ["$wallet", price]
                                    }
                                }

                            },
                        )
                        await interaction.editReply({
                            embeds: [
                                new MessageEmbed().setColor("BLUE")
                                    .setTitle(`Purchase successful `)
                                    .setDescription(" Purchase of ``8000`` successful ✅ ")
                                    .addFields(
                                        { name: '```Item``` : RobKit ', value: '``Price`` :8000', inline: true },
                                    )
                                    .setThumbnail(member.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter(`Economy By Shastri`)

                            ],
                            components: []
                        })
                    }
                    else if (ButtonInteraction.customId == "no") {
                        await interaction.editReply({
                            embeds: [
                                new MessageEmbed().setColor("BLUE")
                                    .setDescription(`Payment Cancelled `)
                            ],
                            components: []
                        })
                    }

                })

                collector.on('end', async (collected) => {
                    if (collected.size > 0) return

                    await interaction.editReply({
                        embeds: [
                            new MessageEmbed().setColor('BLUE')
                                .setDescription(`You failed to respond to the confirmation message`)
                        ], components: []
                    })
                })

                break;
            }
        }
    }

}