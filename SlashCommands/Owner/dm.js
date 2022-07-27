const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const { ownerId } = require("../../config.json")
module.exports = {
    name: 'dm',
    description: 'Bot will dm a user',
    perms: 'Administrator',
    type: "Owner",
    usage: "/dm",
    options: [
        {
            name: 'user',
            description: 'Select a user to dm',
            type: "USER",
            required: true
        },
        {

            name: 'message',
            description: 'Provide the message to send',
            type: "STRING",
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
        console.log(interaction.member.id);
        if (interaction.member.id === ownerId) {
            const { options, member, guild } = interaction
            const msg = options.getString('message')
            const user = options.getUser('user')

            try {
                await user.send({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`${msg}`)
                            .setThumbnail(guild.iconURL({ dynamic: true }))
                            .setFooter(`Message Sent By ${interaction.member.user.username} From ${guild.name}`)
                            .setTitle(`Message From ${interaction.member.user.username}`)
                            .setTimestamp()
                    ]
                });
                interaction.reply(`Msg Sent`)

            } catch  {
                interaction.reply({embeds:[
                    new MessageEmbed().setColor('BLUE')
                    .setDescription(`The user has blocked dms`)
                ]})
            }
        } else {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor('BLUE')
                        .setDescription(`This command is not available`)
                ],ephemeral:true
            })
        }

    }
}   