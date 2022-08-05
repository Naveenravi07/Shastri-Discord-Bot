const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
let verificationschema = require("../../schemas/verification")
let emoji = require("../../emojis.json")
module.exports = {
    name: 'verification',
    description: 'Configure the verification system for this server',
    type: 'Moderation',
    perms: 'Administrator',
    usage: '/verification',
    options: [
        {
            name: 'role',
            description: 'Select the role for verified members',
            type: 'ROLE',
            required: true
        },
        {
            name: 'channel',
            description: 'Select the channel for non verified members to get verified',
            type: 'CHANNEL',
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
        let { options, member, guild } = interaction
        let role = options.getRole('role');
        let channel = options.getChannel('channel')
        if (!member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setDescription("You need ``ADMINISTRATOR`` privilage to use this command")
                ]
            })
        }
        try {
            await verificationschema.findOneAndUpdate(
                { guildid: guild.id },
                {
                    role: role.id,
                    guild: guild.id
                },
                {
                    upsert: true
                }
            )

            const embed = new MessageEmbed().setColor("BLUE")
                .setDescription("Click the button below to verify yourself as a member of" + `${guild.name} !` +
                    "\t\n If somehow, it seems not to be working, contact the owner.")
                .setTitle(`${emoji.bluetick} Get Verified`)
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(`Verification by Shastri`)

            const btn = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('verify')
                    .setStyle('SUCCESS').setLabel(`Get Verified ✅`)
            )
            await channel.send({ embeds: [embed], components: [btn] })

            interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setDescription("✅ | Verification System  \n Make sure to follow these steps after initializing the verification system .\n" +
                            "\n\t 1. Disable all the permissions for @everyone role in your Discord Server Roles Settings. \n" +
                            "\n\t 2. If you have a Welcome Role Enabled, disable all the permissions for that role also.\n" +
                            `\n\t 3. Move the <@&${role.id}> roles on top of the Welcome Role. The order should be like this, @everyone  < Welcome Role < <@&${role.id}> < ... < Owner < ... \n` +
                            `\n\t 4. Turn on the basic permission for the <@&${role.id}> \n` +
                            `\n\t 5. Customize the <#${channel.id}> permission, so that <@everyone> could only see that channel after joining the server`)
                        .setTimestamp()
                        .setFooter(`Verification By Shastri`)
                        .setThumbnail(guild.iconURL({ dynamic: true }))
                ], ephemeral: true
            })
        }
        catch (Err) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("BLUE")
                        .setDescription(`An Error Occoured please wait until we fix the issue`)
                ], ephemeral: true
            })
        }
    }
}