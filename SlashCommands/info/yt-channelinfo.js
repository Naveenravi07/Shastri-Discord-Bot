const yts = require("usetube")
const ids = require("yt-channel-info")
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
    name: 'ytchannelinfo',
    description: 'Displays the information about a youtube channel',
    type: 'information',
    perms: 'everyone',
    usage: '/yt-channelinfo',
    options: [
        {
            name: 'channelname',
            description: 'Pls Provide The Channel Name',
            required: true,
            type: "STRING"
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
        let channel = options.getString('channelname')
        let channelinfo = await yts.searchChannel(channel)
        let channeldetails = channelinfo.channels[0]
        if (!channeldetails) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor('BLUE')
                        .setDescription(`Channel Details Does Not Found`)
                ]
            })
        }
        const channelid = channeldetails.channel_id

        const payload = {
            channelId: channelid,// Required
            channelIdType: 0,
        }

        ids.getChannelInfo(payload).then((response) => {
            if (!response.alertMessage) {
                let links = response.channelLinks.secondaryLinks

                const pfp = response.authorThumbnails[2]
                const url = response.authorUrl

                const bt = new MessageActionRow().addComponents(
                    new MessageButton().setLabel(`${response.author}`).setStyle('LINK').setURL(url),

                )
                const embed = new MessageEmbed()
                    .setTitle(`Youtube Stats`)
                    .addField(" Channel Name", "**" + response.author.toUpperCase() + "**")
                    .addField("Channel Description", "```" + response.description + "```")
                    .setThumbnail(pfp.url)
                    .addField("Subscribers Count", `${response.subscriberCount}`)
                    .addField("Total Videos ", `${channeldetails.nb_videos}`)


                interaction.reply({ embeds: [embed], components: [bt] })

            } else {

                return interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor('BLUE')
                            .setDescription(`Channel Details Does Not Found`)
                    ]
                })
                // throw response.alertMessage
            }
        }).catch((err) => {
            return interaction.reply({embeds:[
                new MessageEmbed().setColor('BLUE')
                .setDescription(`Err With The Api Please Wait For Some Time`)
            ]})
        })

    }
}