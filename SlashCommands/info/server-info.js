let { Client, Interaction, CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'server-info',
    description: 'Shows the server info',
    usage: '/server-info',
    perms: 'everyone',
    type: 'information',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async run(client, interaction, args) {
        let { member, guild, createdTimestamp } = interaction;

        // and then use this to format time
        let createdAt = moment(interaction.guild.createdAt);
        let dateFormated = createdAt.fromNow();
    
        let username = await interaction.guild.fetchOwner()
       
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor('36393E')
                    .setTitle(interaction.guild.name + ' Server Stats')
                    .setThumbnail(guild.iconURL({dynamic:true}))
                    .addField('📄 Channels', `${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_VOICE').size} Voice Channels | ${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').size} Text Channels | ${interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_CATEGORY').size} Categories | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_VOICE').size / interaction.guild.channels.cache.size) * 100)}% Voice Channels | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').size / interaction.guild.channels.cache.size) * 100)}% Text Channels | ${Math.round((interaction.guild.channels.cache.filter(chan => chan.type === 'GUILD_CATEGORY').size / interaction.guild.channels.cache.size) * 100)}% Categories`, true)
                    .addField(':man: Members', `${interaction.guild.members.cache.filter(member => member.user.bot).size} Bots | ${(interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)} Humans | ${interaction.guild.memberCount} Total Members | ${Math.round((interaction.guild.members.cache.filter(member => member.user.bot).size / interaction.guild.memberCount) * 100)}% Bots | ${Math.round((((interaction.guild.memberCount) - (interaction.guild.members.cache.filter(member => member.user.bot).size)) / interaction.guild.memberCount) * 100)}% Humans`, true)
                    .addField(':date: Guild Created At', '' + `${createdAt} | ${dateFormated}`, true)
                    // .addField(':keyboard: AFK Channel ID ',afk , true)
                    .addField(':keyboard: AFK Channel Timeout', interaction.guild.afkTimeout + ' seconds', true)
                    .addField(':frame_photo: Server Icon', interaction.channel.guild.iconURL() === null ? 'Default Icon' : interaction.channel.guild.iconURL(), true)
                    .addField(':id: Guild ID', interaction.guild.id, true)
                    .addField(':man_in_tuxedo: Server Owner', ` <@${interaction.guild.ownerId}>`, true)
                    .addField(':📺: Server Description', `<@${interaction.guild.description}>`, true)
                    .addField(':man_in_tuxedo: Server Owner ID', '' + interaction.guild.ownerId, true)

                    .addField(':joystick: Total Number Of Roles', ` ${interaction.guild.roles.cache.size}`, true)
                    .addField(':closed_lock_with_key:  Verification Level', `${interaction.guild.verificationLevel}`, true)
                    .addField(':closed_lock_with_key:  Nitro STATISTICS ', `Tier ${interaction.guild.premiumTier.replace("TIER_", "")} | ${guild.premiumSubscriptionCount} Boosts | `, true)

            ]
        });
    },
};
