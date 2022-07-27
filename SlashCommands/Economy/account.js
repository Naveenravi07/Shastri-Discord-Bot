let { MessageEmbed, CommandInteraction } = require("discord.js")
const profileschema = require("../../schemas/profileschema")
module.exports = {
    name: 'account',
    description: 'Create,Delete,Activate,Inactivate users economy account',
    type: 'Economy',
    usage: '/account',
    perms: 'everyone',
    options: [
        {
            name: 'options',
            description: 'Select an option',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Create',
                    description: 'Creates a bank account',
                    value: 'create'
                },
                {
                    name: 'Delete',
                    description: "Deletes a bank account",
                    value: 'Delete'
                }
            ]
        }

    ],
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
    async run(client, interaction, args) {
        let { options, member, guild } = interaction
        switch (options.getString('options')) {
            case 'create': {
                let doc = await profileschema.findOne({ userid: member.id, guildid: guild.id })
                if (doc) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor("BLUE")
                                .setDescription(`You Already Have A Bank Account`)
                        ], ephemeral: true
                    })
                } else {
                    try {
                        let bankamt = 5000
                        let walletamt = 1000
                        await profileschema.findOneAndUpdate({ userid: member.id, guildid: guild.id },
                            {
                                guildid: guild.id,
                                userid: member.id,
                                wallet: 1000,
                                bank: 5000
                            },
                            {
                                upsert: true
                            })
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed().setTitle(`** ACCOUNT CREATED **`)
                                    .setThumbnail(member.displayAvatarURL())

                                    .setDescription(`Your Account Has Been Created In Shastris Economy System \n\n`)
                                    .addFields(
                                        { name: '```Bank```', value: '5000', inline: true },
                                        { name: '```Wallet```', value: '1000', inline: true },
                                    )
                                    .setTimestamp()
                                    .setFooter(`Economy By Shastri`)
                            ]
                        })

                    } catch (err) {
                        console.log(err);
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed().setColor("BLUE")
                                    .setDescription(`An Error Occured Please Wait Till We Fix This Issue`)
                            ], ephemeral: true
                        })
                    }

                }
                break;
            }
            case 'Delete': {
                try {
                    let doc = await profileschema.findOne({ userid: member.id, guildid: guild.id })
                    if (!doc) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed().setColor("BLUE")
                                    .setDescription(`You Dont Have A Bank Account `)
                            ], ephemeral: true
                        })
                    } else {
                        await doc.delete()
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed().setColor("BLUE")
                                    .setDescription(`Your economy account has been deleted `)
                            ]
                        })
                    }
                } catch (err) {
                    console.log(err);
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor("BLUE")
                                .setDescription(`An Error Occured Please Wait Till We Fix This Issue`)
                        ], ephemeral: true
                    })
                }
                break;
            }
        }
    }
}