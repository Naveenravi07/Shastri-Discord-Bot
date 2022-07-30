const { MessageEmbed, CommandInteraction } = require("discord.js")
const profileschema = require("../../schemas/profileschema")
const { Types } = require("mongoose");
let emoji = require("../../emojis.json")
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
            let doc = await profileschema.findOne({ userid: member.id, guildid: guild.id })

            if (!doc) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription("You dont have a bank account please make one by ``account`` command")
                    ], ephemeral: true
                })
            } else {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`${emoji.money} **Account Balance**`)
                            .setDescription(` **Bank **: ${doc.bank} \n
                        ** Wallet **: ${doc.wallet} \n
                        **Total **: ${doc.bank + doc.wallet}
                        `)
                            .setColor("BLUE")
                            .setThumbnail(member.displayAvatarURL())
                            .setTimestamp()
                            .setFooter(`Economy By Shastri`)
                    ]
                })
            }
        } else {
            let userid = user.id
            const doc2 = await profileschema.findOne({ userid: userid, guil: guild.id })
            if (!doc2) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`${emoji.invalid}` + "He dont have a bank account please make one by ``account`` command")
                    ], ephemeral: true
                })
            }
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`${emoji.money} **Account Balance**`)
                        .setDescription(` **Bank **: ${doc2.bank} \n
                        ** Wallet **: ${doc2.wallet} \n
                        **Total **: ${doc2.bank + doc2.wallet}
                        `)
                        .setColor("BLUE")
                        .setThumbnail(user.displayAvatarURL())
                        .setTimestamp()
                        .setFooter(`Economy By Shastri`)
                ]
            })
        }
    }
}