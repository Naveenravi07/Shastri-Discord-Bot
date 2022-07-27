const { MessageEmbed, CommandInteraction, Message } = require("discord.js")
const profileschema = require("../../schemas/profileschema")
const ProfileSchema = require("../../schemas/profileschema")
let mongoose = require("mongoose")
const { Types } = require('mongoose')
let { ownerId } = require("../../config.json")
module.exports = {
    name: 'addmoney',
    description: 'Adds Money To ProfileSchema',
    type: "Admin",
    perms: "Owner",
    usage: '.addmoney',
    /**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
    async run(client, message, args) {
        console.log(message.member.user.id);
        if (message.member.user.id === ownerId) {
            let userid = args[0]
            if (!userid) return message.reply(`Provide user id as arg[0]`)
            let guildid = args[1]
            if (!guildid) return message.reply(`Provide guild id as arg[1]`)
            let amt = args[2]
            amt = parseInt(amt)
            if (!amt > 0) {
                return message.reply(`Please Enter A Valid Amount`)
            }
            try {
                let doc = await profileschema.findOne({ userid: userid, guildid: guildid })
                if (!doc) {
                    message.reply("User Dont Have A Bank Account")
                } else {
                    await profileschema.updateOne({ guildid: guildid, userid: userid },
                        [
                            {
                                $set: {
                                    oldval: "$bank"
                                }
                            },
                            {
                                $set: {
                                    bank: {
                                        $add: ["$bank", amt]
                                    }
                                }
                            },

                        ]

                    ).then((r) => {
                        message.reply({
                            embeds: [
                                new MessageEmbed().setColor("BLUE")
                                    .setDescription(`You Have Successfully added ${amt} Rs on ${userid} User Id  in  ${guildid} guild`)
                            ]
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            } catch (err) {
                console.log(err);
                message.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription("An Error Occured . Please Wait Till We Fix This Issue")
                    ]
                })
            }
        } else {
            return
        }

    }
}