const { MessageEmbed, CommandInteraction } = require("discord.js")
let profileschema = require('../../schemas/profileschema')
const { Types } = require('mongoose')
let emoji = require("../../emojis.json")
let ms = require("ms")
module.exports = {
    name: 'rob',
    description: 'Robs and grab money from a user [increase money by using robkit]',
    type: 'Economy',
    pems: 'everyone',
    usage: '/rob',
    options: [
        {
            name: 'user',
            description: 'Select the user to robbed',
            required: true,
            type: 'USER'
        }
    ],
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
    async run(client, interaction, args) {
        let { options, member, user, guild } = interaction
        let mention = options.getUser('user')
        let scheck = await profileschema.findOne({ userid: member.id, guildid: guild.id })
        if (!scheck) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor(`BLUE`)
                        .setDescription(`${emoji.invalid} You do not have any account associated with shastri economy system. Please 
                        create an account by`+ "``account``" + `command`)
                ], ephemeral: true
            })
        }
        let doc = await profileschema.findOne({ userid: mention.id, guildid: guild.id })

        if (!doc) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor(`BLUE`)
                        .setDescription(`${emoji.invalid} User does not have any account associated with shastri economy system`)
                ], ephemeral: true
            })
        }
        if (member.id === mention.id) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor(`BLUE`)
                        .setDescription(`${emoji.invalid} You cant rob yourself`)
                ], ephemeral: true
            })
        }
        if (scheck.robbedTime !== null && 300000 - (Date.now() - scheck.robbedTime) > 0) {
            let timeleft = ms(300000 - (Date.now() - scheck.robbedTime))
            console.log(timeleft);
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setDescription(`${emoji.invalid} You have already robbed a member. please try after ${timeleft}ins`)
                ], ephemeral: true
            })
        }


        const roberwallet = scheck.wallet
        const memberwalllet = doc.wallet
        if (roberwallet <= 2000) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setDescription(`${emoji.invalid} - You  need atlest 2000 in your wallet to rob someone`)
                ], ephemeral: true
            })
        } else if (memberwalllet <= 2000) {
            if (scheck.wallet > 100) {
                function randomIntFromInterval(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }
                const reward2 = randomIntFromInterval(50, 90)
                let total = roberwallet - reward2
                await scheck.update([
                    {
                        $set: {
                            wallet: total
                        }
                    }
                ])
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`${emoji.laugh} You have been fined ${reward2} for trying to rob  poor  <@${mention.id}> `)
                    ]
                })
            } else {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(` ${emoji.invalid} <@${member.id} is not a robable member`)
                    ]
                })
            }

        }

        if (scheck.items.includes('robkit')) {
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
            const reward2 = randomIntFromInterval(1999, memberwalllet)
            console.log(reward2);
            let total = reward2 + scheck.wallet
            let robbeduserwallet = doc.wallet - reward2
            await scheck.update([
                {
                    $set: {
                        wallet: total,
                        robbedTime: Date.now()
                    },


                }
            ])
            await doc.update([
                {
                    $set: {
                        wallet: robbeduserwallet,
                    }
                }
            ])

            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setTitle(`Robbed `)
                        .setDescription(`${emoji.greentick} You robbed ${reward2} from  <@${mention.id}> `)
                        .setTimestamp()
                        .setThumbnail(mention.displayAvatarURL())
                        .setFooter(`Economy by shastri`)
                ]
            })
        } else {
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
            let reward2 = randomIntFromInterval(1999, memberwalllet)
            console.log(reward2);
            if (reward2 > 1000) {
                reward2 = 0.5 * reward2
            }
            let total = reward2 + scheck.wallet
            let robbeduserwallet = doc.wallet - reward2

            await scheck.update([
                {
                    $set: {
                        wallet: total,
                        robbedTime: Date.now()
                    },


                }
            ])
            await doc.update([
                {
                    $set: {
                        wallet: robbeduserwallet
                    }
                }
            ])

            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setTitle(`Robbed `)
                        .setDescription(`${emoji.greentick} You robbed ${reward2} from <@${mention.id}> `)
                        .setTimestamp()
                        .setThumbnail(mention.displayAvatarURL())
                        .setFooter(`Economy by shastri`)
                        .addFields({ name: 'Suggestion', value: 'Increase the amount by using a robkit . ' })
                ]
            })
        }
    }
}