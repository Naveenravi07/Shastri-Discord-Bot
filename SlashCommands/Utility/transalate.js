const api = require("@iamtraction/google-translate")
const { Client, CommandInteraction, MessageEmbed, } = require("discord.js");

module.exports = {
    name: 'transalate',
    description: "Transalate the given text to english",
    type: 'Utility',
    perms: 'everyone',
    usage: '/transalate',
    options: [
        {
            name: 'text',
            description: "Give the text to be transalated",
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
        let { member, guild, options } = interaction
        let text = options.getString('text')

        const transalated = await api(text, { to: 'en' });
        const embed = new MessageEmbed()
            .setTitle(`Translation`)
            .setColor('BLUE')
            .addField("Raw", "```" + text + "```")
            .addField("Transalted", "```" + transalated.text + "```")
            .setFooter(`Tranasalted By Shastri `)
            .setTimestamp()
        interaction.reply({ embeds: [embed] })
    }
}