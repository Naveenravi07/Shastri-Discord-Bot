const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: "Displays the profile picture of the mentioned user",
    type: 'information',
    perms: 'everyone',
    usage: '/avatar',
    options: [
        {
            name: 'user',
            description: "Select the user",
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
        let { member, guild, options } = interaction
        let user = options.getUser('user')
        if (!user) {
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setImage(member.displayAvatarURL({ dynamic: true, size: 512 }))
                .setTitle(`${member.user.username} 's Avatar`)

           await interaction.reply({ embeds: [embed] })
        } else {
            const embed2=new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({dynamic:true,size:512}))
            .setTimestamp()
            .setFooter(`Image by shastri`)

            await interaction.reply({embeds:[embed2]})
        }
    }
}