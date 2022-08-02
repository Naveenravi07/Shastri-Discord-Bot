const { MessageEmbed, CommandInteraction } = require("discord.js")
module.exports = {
    name: 'nick-reset',
    description: 'Removes  The Nickname Of A User ',
    type: 'Moderation',
    perms: 'MANAGE_NICKNAMES',
    usage: '/nick-reset',
    options: [
        {
            name: 'user',
            description: 'Select the user',
            type: 'USER',
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

        if (interaction.member.permissions.has("MANAGE_NICKNAMES")) {
            try {
                await user.setNickname("", 'noreason')

                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor(`BLUE`)
                            .setDescription(`\n Removed  Nickname of <@${user.id}> `)
                            .setFooter(`Nickname Removed By Shasri`)
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