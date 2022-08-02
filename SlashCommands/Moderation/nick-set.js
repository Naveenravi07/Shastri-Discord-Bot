const { MessageEmbed, CommandInteraction } = require("discord.js")
module.exports = {
    name: 'nick-set',
    description: 'Change The Nickname Of A User ',
    type: 'Moderation',
    perms: 'MANAGE_NICKNAMES',
    usage: '/nick-set',
    options: [
        {
            name: 'user',
            description: 'Select the user',
            type: 'USER',
            required: true
        },
        {
            name: 'nickname',
            description: 'Provide the nickname',
            type: 'STRING',
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
        const { member, guild, options } = interaction
        const user = options.getMember('user')
        const nickname = options.getString('nickname')

        if (interaction.member.permissions.has("MANAGE_NICKNAMES")) {
            try {
                await user.setNickname(nickname, 'noreason')
                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor(`BLUE`)
                            .setDescription(`\n Changed Nickname of <@${user.id}> `)
                            .setFooter(`Nickname Changed By Shasri`)
                            .setTimestamp()
                    ]
                })
            } catch (Err) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`The person you are trying to change nickname is
                             having a role higher than you. To Change the nickname the bot must have a role higher than the mentioned one`)
                    ], ephemeral: true
                })
            }
        } else {
            interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setDescription(`You Dont Have Permission To Manage Nicknames`)
                ]
            })
        }
    }
}