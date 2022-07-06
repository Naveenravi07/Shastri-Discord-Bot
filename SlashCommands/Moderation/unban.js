const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { clientid, banlogs, unbanlogchannel } = require('../../config.json');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Discord.Collection();

module.exports = {
  name: 'unban',
  description: 'Unbans a User',
  type:'Moderation',
  usage:'/unban',
  perms:'Ban Members',
  options: [
    {
      name: 'user-id',
      description: 'provide a user id',
      type: 'STRING',
      required: true,
    },
  ],
  async run(client, interaction, args) {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      let CantUnbanEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`User Cannot Be Unbanned 🤖`)
        .setDescription(`Hey You Cannot Unban. Make Sure You Have  Appropriate Roles `)
        .setAuthor({
          name: `${interaction.member.user.username}`,
          iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
          url: 'https://naveenravi.com',
        })
        .setThumbnail(interaction.member.displayAvatarURL({ format: 'png' }));
      interaction.reply({ embeds: [CantUnbanEmbed], ephemeral: true });
    }
    // if(!message.guild.me.permissons.has("BAN_MEMBERS")) return message.channel.send("I Dont Have Permissions")
    let userId = interaction.options.getString('user-id');
    if (!userId) {
      let usernotfound = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`User Cannot Be Unbanned 🤖`)
        .setDescription(`Pls Enter The UserId Of The User To Unban `)
        .setAuthor({
          name: `${interaction.member.user.username}`,
          iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
          url: 'https://naveenravi.com',
        })
        .setThumbnail(message.author.displayAvatarURL({ format: 'png' }));
      interaction.reply({ embeds: [usernotfound], ephemeral: true });
    } else if (userId == interaction.member.id) {
      let sameUnban = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`User Cannot Be Unbanned 🤖`)
        .setDescription(`You cannot Unban Yourself `)
        .setAuthor({
          name: `${interaction.member.user.username}`,
          iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
          url: 'https://naveenravi.com',
        })
        .setThumbnail(interaction.member.displayAvatarURL({ format: 'png' }));
      interaction.reply({ embeds: [sameUnban], ephemeral: true });
    }

    let bans = await interaction.guild.bans.fetch();
    if (bans.has(userId)) {
      interaction.guild.members.unban(userId);
      let date = new Date();
      let Unbanned = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`User  Unbanned 🤖`)
        .setDescription(`<@${userId}> Have Been Unbanned By <@${interaction.member.id}> On ${date}`)
        .setAuthor({
          name: `${interaction.member.user.username}`,
          iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
          url: 'https://naveenravi.com',
        })
        .setThumbnail(interaction.member.displayAvatarURL({ format: 'png' }));
      interaction.reply({ embeds: [Unbanned] });
    } else {
      let Notfound = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`User  Cannot Be Unbanned 🤖`)
        .setDescription(`User Id Not Found In Ban List. Make Sure You Spelled It Correctly`)
        .setAuthor({
          name: `${interaction.member.user.username}`,
          iconURL: 'https://rihebc.com/wp-content/uploads/2021/01/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
          url: 'https://naveenravi.com',
        })
        .setThumbnail(interaction.author.displayAvatarURL({ format: 'png' }));
      interaction.reply({ embeds: [Notfound],ephemeral:true })
    }
  },
};
