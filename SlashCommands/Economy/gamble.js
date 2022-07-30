let { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const profileschema = require("../../schemas/profileschema")
let emoji = require("../../emojis.json")
module.exports = {
    name: 'gamble',
    description: 'Loose or double your money',
    type: 'Economy',
    perms: 'everyone',
    usage: '/gamble',
    options: [
        {
            name: 'amount',
            description: "Provide the amount for gamble",
            type: "INTEGER",
            required: true
        }
    ],
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
    async run(client, interaction, args) {
        let { options, guild, member } = interaction
        let amount = options.getInteger('amount')
        if (amount < 500) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE").setDescription("Your Gamble Amount Must Be Greater Than 500")
                ], ephemeral: true
            })
        }

        let doc = await profileschema.findOne({ userid: member.id, guildid: guild.id })

        let total
        if (!doc) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE").setDescription("You Dont Have A Bank Account Please Make One By ``account`` Command ")
                ], ephemeral: true
            })
        } else {
            total = doc.bank
        }
        if (total < amount) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE").setDescription("Your Do Not Have Sufficient Money In Your Bank")
                ], ephemeral: true
            })
        }
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const reward2 = randomIntFromInterval(1, 4)

        if (reward2 == "2") {
            let pushtotoal = amount + total
            try {

                await profileschema.updateOne(
                    {
                        userid: member.id,
                        guildid: guild.id
                    },
                    [
                        {
                            $set: {
                                oldval: "$bank",
                                bank: pushtotoal
                            }
                        },
                    ]
                )

                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`Congrats You Have Gained ${amount * 2} In This Gamble ${emoji.dance}`)
                    ]
                })
            } catch (err) {
                console.log(err);
                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`${emoji.invalid}- An Error Occured please report till we fix this issue`)
                    ], ephemeral: true
                })
            }

        } else {
            let pushtotoal2 = total - amount
            try {

                await profileschema.updateOne(
                    {
                        userid: member.id,
                        guildid: guild.id
                    },
                    [
                        {
                            $set: {
                                oldval: "$bank",
                                bank: pushtotoal2
                            }
                        },
                    ]
                )

                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`${emoji.laugh}- Oops You Have Lost ${amount} In This Gamble`)
                    ]
                })
            } catch (err) {
                console.log(err);
                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(` ${emoji.invalid}- An Error Occured please report till we fix this issue`)
                    ], ephemeral: true
                })
            }

        }
    }
}