const { MessageEmbed, CommandInteraction } = require("discord.js")
const profileschema = require("../../schemas/profileschema")
const { Types } = require("mongoose");
module.exports = {
    name: 'balance',
    description: 'Shows the account balance of user',
    type: 'Economy',
    usage: '/balance',
    perms: 'everyone',
    options: [
        {
            name: 'user',
            description: 'Select a user',
            type: 'USER',
            required: false
        }
    ],
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/

    async run(client, interaction, args) {
        const { member, guild, options } = interaction

        const user = options.getUser('user')
        if (!user) {
            let doc = await profileschema.findOne({ userid: member.id })

            if (!doc) {
                await profileschema.findOneAndUpdate(
                    { _id: Types.ObjectId() },
                    {
                        guildid: member.guild.id,
                        userid: member.id,
                        bank: 1000,
                        wallet: 0
                    },
                    {
                        upsert: true
                    }
                )
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setTitle('Account Balance')
                            .addField(`**Bank  **`, `** 1000 Coins **`)
                            .addField(`**Wallet **`, `**  0 Coins **`)
                            .addField(`**Total **`, `**  1000 Coins **`)
                            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                            .setTimestamp()
                            .setFooter(`Economy By Shastri`)
                    ]
                })
            } else {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setTitle('Account Balance')
                            .addField(`**Bank **  `, ` ** ${doc.bank} **`)
                            .addField(`**Wallet **  `, `**${doc.wallet} **`)
                            .addField(`**Total  ** `, ` **${doc.bank + doc.wallet}**`)
                            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                            .setTimestamp()
                            .setFooter(`Economy By Shastri`)
                    ]
                })
            }
        } else {
            let userid = user.id
            const doc2 = await profileschema.findOne({ userid: userid })
            if (!doc2) {
                await profileschema.findOneAndUpdate(
                    { _id: Types.ObjectId() },
                    {
                        guildid: member.guild.id,
                        userid: user.id,
                        bank: 1000,
                        wallet: 0
                    },
                    {
                        upsert: true
                    }
                )
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setTitle('Account Balance')
                            .addField(`**Bank  **`, `** 1000 Coins **`)
                            .addField(`**Wallet **`, `**  0 Coins **`)
                            .addField(`**Total **`, `**  1000 Coins **`)
                            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                            .setTimestamp()
                            .setFooter(`Economy By Shastri`)
                    ]
                })
            }
            await interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setTitle('Account Balance')
                        .addField(`**Bank  **`, `${doc2.bank}`)
                        .addField(`**Wallet **`, `${doc2.wallet}`)
                        .addField(`** Total ** `, ` ${doc2.bank + doc2.wallet}`)
                        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                        .setFooter(`Economy By Shastri`)
                ]
            })
        }
    }
}