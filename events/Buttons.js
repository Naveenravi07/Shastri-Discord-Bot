const { MessageEmbed } = require("discord.js")
const emojis = require("../emojis.json")
let client = require("../index")
let verificationschema = require("../schemas/verification")
client.on('interactionCreate', async (interaction) => {

    if (!interaction.isButton()) return

    const customid = ["verify"]
    if (!customid.includes(interaction.customId)) return

    await interaction.deferReply({ ephemeral: true })
    if (interaction.customId == 'verify') {

        /**
        * @param {CommandInteraction} interaction
        */
        let { guild, user, member } = interaction
        try {
            let doc = await verificationschema.findOne({ guildid: interaction.guild.id })
            if (!doc) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setDescription(`Could not find any data please contact owner`)
                            .setColor("BLUE")
                    ], ephemeral: true
                })
            }
            const Role = guild.roles.cache.get(doc.role)
            if (member.roles.cache.has(Role.id)) {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed().setColor('BLUE')
                            .setDescription(`You are already verified in this server`)
                    ]
                })
            }

            await member.roles.add(Role)

            await interaction.followUp({
                embeds: [
                    new MessageEmbed().setColor('BLUE')
                        .setDescription(`${emojis.greentick} You are now verified `)
                ], ephemeral: true
            })

        } catch (err) {
            console.log(err);
        }
    }
})