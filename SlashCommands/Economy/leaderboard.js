let { MessageEmbed, CommandInteraction, Client } = require("discord.js")
let profileschema = require("../../schemas/profileschema")
let emoji = require("../../emojis.json")
module.exports = {
    name: 'leaderboard',
    description: 'Shows the economic leaderboard ',
    type: 'Economy',
    perms: 'everyone',
    usage: '/leaderboard',
    /** 
     *
    * @param {Client} client 
     * @param {CommandInteraction} interaction  
    * @param {String[] } args
     */
    async run(client, interaction, args) {
        let { guild, member, user } = interaction
        let doc = await profileschema.find({ guildid: guild.id }).sort({ bank: -1 })

        console.log(doc);
        if (doc.length <= 0) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor(`BLUE`)
                        .setDescription("``No one has a account related with shastri economy system in this server`` ")
                        .addFields(
                            {
                                name: 'How to create an account ? ',
                                value: 'use command ``/account`` to create account .  Head to my dashboard to know more '
                            }
                        )
                ]
            })
        }

        let lbmap = doc.map((val, i) => {
            return ` ${i + 1} |  \t` + "``" + `${val.username} ` + "``" + ` | ${val.bank} Coins`
        })
        lbmap = lbmap.join("\n")

        let embed = new MessageEmbed().setColor(`BLUE`)
            .setTitle(`Economic Leaderboard ${emoji.money} `)
            .setTimestamp()
            .setFooter(`Economy by shastri`)
            .setDescription("** Top 10 ** \n" + lbmap)
        await interaction.reply({ embeds: [embed] })
    }
}