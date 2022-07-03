const Discord = require('discord.js');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { clientid, kicklogs } = require('../../config.json');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

module.exports = {
  name: 'kick',
  description: 'Kicks a member',
  options: [
    {
      name: 'user',
      description: 'select the user to be kicked',
      type: 'USER',
      required: true,
    },
  ],
  async run(client, interaction, args) {
    if (interaction.member.permissions.has('KICK_MEMBERS')) {
      let { options } = interaction;
      const member = options.getMember('user');
      if (!member) {
        let KickDummyEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`User Does Not Exist 🤖`)
          .setDescription(`Hey The User Does Not Exist. Make Sure You Have Tagged The Correct One `)
          .setAuthor({ name: `${interaction.member.user.username}`, iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg' })
          .setThumbnail(interaction.member.avatarURL());
        interaction.channel.send({ embeds: [KickDummyEmbed], ephemeral: true });
      } else {
        // console.log(member.roles);
        const mentionedPosition = member.roles.highest.position;
        const memberposition = interaction.member.roles.highest.position;

        if (memberposition <= mentionedPosition) {
          let KickErr = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User Cannot Be Kicked 🤖`)
            .setDescription(`Hey The User You Are Trying To Kick Is Having A Greater Or Equal Role Than You `)
            .setAuthor({
              name: `${interaction.member.user.username}`,
              iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
              url: 'https://naveenravi.com',
            })
            .setThumbnail(interaction.member.avatarURL());
          interaction.reply({ embeds: [KickErr], ephemeral: true });
        } else if (member === clientid) {
          let KickErr2 = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Bot Cannot Be Kicked 🤖`)
            .setDescription(`Hey The Bot You Are Trying To Kick Is Having A Greater Or Equal Role Than You `)
            .setAuthor({
              name: `${interaction.member.user.username}`,
              iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
              url: 'https://naveenravi.com',
            })
            .setThumbnail(interaction.member.avatarURL());
          interaction.reply({ embeds: [KickErr2], ephemeral: true });
        } else if (memberposition >= memberposition) {
          const targetId = interaction.guild.members.cache.get(member.id);
          targetId.kick();
          // Embedd Message
          let authorId = interaction.member.id;
          let date = new Date();
          avatarURL = interaction.member.avatarURL();
          let KickEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User kicked 🤖`)
            .setDescription(`Hey ${member} Have Been Kicked By <@${authorId}> on ${date} `)
            .setAuthor({
              name: `${interaction.member.user.username}`,
              iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
              url: 'https://naveenravi.com',
            })
            .setThumbnail(member.displayAvatarURL({ format: 'png' }));
          interaction.reply({ embeds: [KickEmbed], ephemeral: true });
        }
      }
    } else {
      let CantKickDummyEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`User Cannot Be Kicked 🤖`)
        .setDescription(`Hey You Cannot Kick This Member. Make Sure You Have  Appropriate Roles `)
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: 'https://images.wondershare.com/filmora/article-images/2021/my-hero-academia-discord.jpg', url: 'https://naveenravi.com' })
        .setThumbnail(interaction.member.avatarURL());
      interaction.reply({ embeds: [CantKickDummyEmbed], ephemeral: true });
    }
  },
};
