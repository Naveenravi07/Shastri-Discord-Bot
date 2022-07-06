const { MessageEmbed } = require('discord.js');
const { messagelogchannel } = require('../../config.json');
const { Client, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Deletes a specified number of messages from a server ',
  type: 'Moderation',
  usage:'/clear',
  perms:'Manage Messages',
  options: [
    {
      name: 'amount',
      description: 'Provide the amount of messages to be deleted',
      type: 'INTEGER',
      required: true,
    },
  ],
  async run(client, interaction, args) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      interaction.reply({ content: 'You Do Not Have Permissions To Delete Messages', ephemeral: true });
    } else {
      // let num = interaction.options.getString('num')
      let num = interaction.options.getInteger('amount');
      if (!num) {
        return interaction.reply({ content: 'Pls Specify The Amount Of Messages To Delete', ephemeral: true });
      } else if (isNaN(num)) {
        return interaction.reply({ content: 'Pls Enter A Valid Number', ephemeral: true });
      } else if (num > 100) {
        interaction.reply({ content: 'You Cant Delete More Than 100 Messages', ephemeral: true });
      } else if (num < 1) {
        interaction.reply({ content: 'You Must Delete At Least One Message', ephemeral: true });
      } else if (num >= 1) {
        await interaction.channel.messages.fetch({ limit: num }).then((messages) => {
          let DeleteTest = interaction.channel.bulkDelete(messages, true);
          if (DeleteTest) {
            let authorId = interaction.member.id;
            let noOfMsg = num;
            let channelName = interaction.channel;
            let avatarURL = interaction.member.avatarURL();
            let ClearEmbed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Messages Deleted 🤖')
              .setDescription(`Hey <@${authorId}> Deleted ${noOfMsg} Messages  In<#${channelName.id}>`)
              .setAuthor({
                name: 'Naveen 404',
                iconURL: 'https://images.wondershare.com/filmora/article-images/2021/my-hero-academia-discord.jpg',
                url: 'https://naveenravi.com',
              })
              .setThumbnail(avatarURL);
            interaction.reply({ embeds: [ClearEmbed], ephemeral: true });
          }
        });
      }
    }
  },
};
