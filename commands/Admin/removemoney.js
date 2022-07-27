const { MessageEmbed, CommandInteraction, Message } = require("discord.js")
const profileschema = require("../../schemas/profileschema")
const ProfileSchema = require("../../schemas/profileschema")
let mongoose = require("mongoose")
const { Types } = require('mongoose')
module.exports = {
    name: 'removemoney',
    description: 'Adds Money To ProfileSchema',
    type: "Admin",
    perms: "Owner",
    usage: '.removemoney',
    /**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
    async run(client, message, args) {
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
                if (doc.bank > amt) {
                    return message.reply(`Action Cannot be done user only have ${doc.bank} Rs in his account`)
                }
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
                                    $subtract: ["$bank", amt]
                                }
                            }
                        },

                    ]

                ).then((r) => {
                    message.reply({
                        embeds: [
                            new MessageEmbed().setColor("BLUE")
                                .setDescription(`You Have Successfully removed ${amt} Rs on ${userid} User Id  in  ${guildid} guild`)
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
    }else{
        return
    }
}
}