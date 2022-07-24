const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js")
const { Types } = require('mongoose')
const dailyschema = require("../../schemas/dailyrewardschema")
const profileschema = require('../../schemas/profileschema')
module.exports = {
    name: 'daily',
    description: 'Gets your daily bonous ',
    type: 'Economy',
    perms: 'everyone',
    usage: '/daily',
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
    async run(client, interaction, args) {
        const { member, guild, user } = interaction
        const userid = member.id
        const check = await dailyschema.findOne({ userid: userid })
        if (!check) {
            const usercheck = await profileschema.findOne({ userid: userid })
            if (!usercheck) {
                await profileschema.findOneAndUpdate(
                    {
                        userid: userid
                    },
                    {
                        _id: Types.ObjectId(),
                        userid: userid,
                        guildid: guild.id,
                        bank: 1000,
                        wallet: 0
                    }, {
                    upsert: true
                })
            }

            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
            const reward = randomIntFromInterval(1500, 1200)
            // console.log(reward)
            const data = await dailyschema.findOneAndUpdate(
                {
                    userid: userid
                },
                {
                    _id: Types.ObjectId(),
                    userid: userid,
                    guildid: guild.id,
                    reward: reward,
                    time: Date.now()
                }, {
                upsert: true
            })

            let ag = await profileschema.updateOne(
                {
                    userid: userid
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
                                $add: [reward, "$oldval"]
                            }
                        }
                    },
                ]
            )
            // console.log(ag);
            interaction.reply({
                embeds: [
                    new MessageEmbed().setColor('BLUE')
                        .setDescription(`You- have earned ${reward} as your daily reward. Come back in  a day again`)
                ]
            })
        } else {
            let now = Date.now()
            let diff = now - check.time
            // console.log(diff + "\t  millisecons");
            if (diff < 86400000) {
                let sec = diff / 1000
                let mins = sec / 60
                let hours = mins / 60

                if (mins < 2) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor('BLUE')
                                .setDescription(`You Have Already Colledcted Your Daily Reward. Comeback In A Day `)
                        ], ephemeral: true
                    })
                } else if (hours > 1) {
                    let diff3 = 24 - hours

                    let rdiff = Math.round(diff3)
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor('BLUE')
                                .setDescription(`You Have Already Colledcted Your Daily Reward.Comeback In  ${rdiff} Hours  `)
                        ], ephemeral: true
                    })
                } else if (hours < 1) {

                    let diff2 = 24 - hours
                    let rdiff2 = Math.round(diff2)


                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor('BLUE')
                                .setDescription(`You Have Already Colledcted Your Daily Reward. Comeback In  ${rdiff2} Hours`)
                        ], ephemeral: true
                    })
                }
            } else {
                // const usercheck2 = await profileschema.findOne({
                //     userid: userid,
                //     guildid: guild.id
                // })
                // if (!usercheck2) {
                //     await profileschema.findOneAndUpdate(
                //         {
                //             userid: userid
                //         },
                //         {
                //             _id: Types.ObjectId(),
                //             userid: userid,
                //             guildid: guild.id,
                //             bank: 1000,
                //             wallet: 0
                //         }, {
                //         upsert: true
                //     })
                // }

                function randomIntFromInterval(min, max) { // min and max included 
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }
                const reward2 = randomIntFromInterval(1500, 1200)
                const data = await dailyschema.findOneAndUpdate(
                    {
                        userid: userid,
                        guildid:guild.id
                    },
                    {
                        id: Types.ObjectId(),
                        userid: userid,
                        guildid: guild.id,
                        reward: reward2,
                        time: Date.now()
                    }, {
                    upsert: true
                })
                let ag2 = await profileschema.updateOne(
                    {
                        userid: userid
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
                                    $add: [reward2, "$oldval"]
                                }
                            }
                        },
                    ]
                )
                // console.log(ag2);
                function randomIntFromInterval(min, max) { // min and max included 
                    return Math.floor(Math.random() * (max - min + 1) + min)
                }
                const reward = randomIntFromInterval(1500, 1200)
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor('BLUE')
                            .setDescription(`You - have earned ${reward} as your daily reward.Come back in a day again`)
                    ]
                })
            }
        }
    }
}