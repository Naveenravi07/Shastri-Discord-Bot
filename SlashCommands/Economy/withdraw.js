const { MessageEmbed, CommandInteraction } = require("discord.js")
let profileschema = require('../../schemas/profileschema')
const { Types } = require('mongoose')
module.exports = {
    name: 'withdraw',
    description: 'Withdraws money from bank',
    type: 'Economy',
    pems: 'everyone',
    usage: '/withdraw',
    options: [
        {
            name: 'amount',
            description: 'The amount  to be withdrawed',
            required: true,
            type: 'INTEGER'
        }
    ],
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
    async run(client, interaction, args) {
        const { options, member, guild } = interaction
        let userid = member.id
        const num = options.getInteger(`amount`)
        if (num <= 0) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor(`BLUE`).setDescription(`Please provide a valid amount`)
                ], ephemeral: true
            })
        } else {
            let doc = await profileschema.findOne({ userid: userid, guildid: guild.id })
            // console.log(doc);
            if (!doc) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription("You dont have a bank account please make one by ``account`` command")
                    ], ephemeral: true
                })
            } else {
                if (num > doc.bank) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor(`BLUE`)
                                .setDescription(`You do not have enough balance in your bank`)
                        ], ephemeral: true
                    })
                } else {
                    let newval = doc.bank - num
                    let oldval = doc.bank
                    await profileschema.updateOne(
                        {
                            userid: userid,
                            guildid: guild.id
                        },
                        [
                            {
                                $set: {
                                    oldval: "$bank"

                                }
                            },
                            {
                                $set: {
                                    bank: {
                                        $subtract: ["$bank", num]
                                    },
                                    wallet: {
                                        $add: ["$wallet", num]
                                    }
                                }
                            },
                        ]
                    )
                }
                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor('BLUE')
                            .setDescription(`Withdrawal of ${num} successful `)
                    ]
                })
            }
        }
    }
}