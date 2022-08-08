let { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageSelectMenu, MessageComponentInteraction } = require("discord.js")
let emoji = require("../../emojis.json")
let commandschema = require("../../schemas/commandschema")
module.exports = {
    name: 'help',
    description: 'Shows the help menu',
    type: 'information',
    perms: 'everyone',
    usage: '/help',
    options: [
        {
            name: 'command-name',
            description: 'Enter the command name',
            type: 'STRING',
            required: false
        }
    ],
    /** 
     *
    * @param {Client} client 
     * @param {CommandInteraction} interaction  
    * @param {String[] } args
     */
    async run(client, interaction, args) {
        let { options, guild, member, user } = interaction
        let cmdcheck = options.getString('command-name')
        if (cmdcheck) {
            let doc2 = await commandschema.find({ command: cmdcheck })
            if (!doc2) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor("BLUE")
                            .setDescription(`The command you searched is invalid ${emoji.invalid} ! \n  Use ` + "``" + "/help" + "``" + "to view all the commands")
                    ], ephemeral: true
                })
            }
            let doc = doc2[0]
            let perms = doc.perms || "no perms defined for this command"
            let cmdembed = new MessageEmbed()
                .setColor("BLUE")
                .setThumbnail(guild.me.displayAvatarURL({ dynamic: true }))
                .setTitle(`Command Details `)
                .addFields(
                    {
                        name: `**Command :**`,
                        value: "``" + `${doc.command}` + "``",
                        inline: false
                    },
                    {
                        name: '** Command Description : **',
                        value: "``" + `${doc.description}` + "``",
                        inline: false
                    },
                    {
                        name: " **User Permissions: **",
                        value: `${perms}`,
                        inline: false
                    },
                )
                .setTimestamp()
                .setFooter("Help by Shastri")
            return interaction.reply({ embeds: [cmdembed] })
        }
        let dirs = [...new Set(client.cmdNames.map((cmd) => cmd.directory))]
        let embed = new MessageEmbed()
            .setTitle(`${emoji.purplefire} | Bot Commands`)
            .setDescription("``To view the command list select the command category from the dropdown``" + "\n **Categories ** \n \u200B")
            .setThumbnail(guild.me.displayAvatarURL({ dynamic: true }))
            .setColor(`BLUE`)
            .addFields(
                {
                    name: "⛏ Moderation",
                    value: "``/help moderation``",
                    inline: true
                },
                {
                    name: "😀 Fun",
                    value: "``/help fun``",
                    inline: true
                },
                {
                    name: "💰 Economy",
                    value: "``/help economy``",
                    inline: true
                },
                {
                    name: "💰 Music",
                    value: "``/help music``",
                    inline: true
                },
                {
                    name: "🔰 Info",
                    value: "``/help info``",
                    inline: true
                },
                {
                    name: "➿ Utility",
                    value: "``/help utility``",
                    inline: true
                }
            )

        let row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('helpbar')
                .setPlaceholder("Choose a category")
                .addOptions(
                    {
                        label: 'Moderation',
                        value: 'Moderation',
                        description: 'Moderation Commands'
                    },
                    {
                        label: 'Info',
                        value: 'information',
                        description: 'Information Commands '
                    },
                    {
                        label: 'Fun',
                        value: 'Fun',
                        description: 'Fun Commands '
                    },
                    {
                        label: 'Economy',
                        value: 'Economy',
                        description: 'Economy  Commands '
                    },
                    {
                        label: 'Utility',
                        value: 'Utility',
                        description: 'Utility  Commands '
                    },
                    {
                        label: 'Music',
                        value: 'Music',
                        description: 'Music  Commands '
                    }
                )
        )
        await interaction.reply({ embeds: [embed], components: [row] })


        let collector = interaction.channel.createMessageComponentCollector({
            max: 6,
            time: 120000,
            dispose: true,
            componentType: "SELECT_MENU"
        })

        collector.on(`collect`, async (ButtonInteraction) => {
            if (ButtonInteraction.user.id !== user.id) {
                return
            }
            let [dir] = ButtonInteraction.values
            let docs = await commandschema.find({ type: dir })
            let i
            let cmdembedd = new MessageEmbed()
                .setColor("BLUE")
                .setTitle("``" + `${dir} ` + "``" + "  Commands" + `${emoji.alert}`)
                .setDescription("To know the details of a command use ``/help command-name`` For example `` /help ping `` \u200B")
                .setTimestamp()
                .setFooter('Help by Shastri')

            docs.map((cmd) => {
                return cmdembedd.addFields({
                    name: "``" + `${cmd.command}` + "``",
                    value: `${cmd.description}`,
                    inline: true
                })
            })
            await interaction.followUp({ embeds: [cmdembedd], components: [row] })

        })
    }
}