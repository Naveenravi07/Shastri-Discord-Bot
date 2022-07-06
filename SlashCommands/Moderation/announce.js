const discord = require('discord.js');
const { Permissions, MessageEmbed } = require('discord.js');
const { Client, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'announce',
  description: 'Creates an announcement',
  type: 'Moderation',
  usage:'/announce',
  perms:'Manage Messages',
  options: [
    {
      name: 'message',
      description: 'Type the message that you want to  announce',
      type: 'STRING',
      required: true,
    },
    {
      name: 'channel',
      description: 'Select the channel for announcement',
      type: 'CHANNEL',
      required: true,
    },
    {
      name: 'role',
      description: 'Provide the roles that you  want to ping',
      type: 'ROLE',
      required: false,
    },
    {
      name: 'image-url',
      description: 'Provide the image url',
      type: 'STRING',
      required: false,
    },
  ],

  async run(client, interaction, args) {
    /**
     *    * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      interaction.reply(`You Dont Have Permissions To Announce Message`);
    } else {
      let { options, user } = interaction;

      let channel = options.getChannel('channel');
      let text = options.getString('message');
      let role = options.getRole('role');
      let imageurl = options.getString('image-url');

      if (imageurl) {
        if (!imageurl.startsWith("https://cdn.discordapp.com/attachments/")) {
          let invalidlinkembedd = new MessageEmbed();
          console.log(user.tag);
          invalidlinkembedd
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setColor('DARK_AQUA')
            .setDescription(
              `Image url starting with \`https://cdn.discordapp.com/attachments/\` are only accepted 
               '\n' Simply sent your image  to any discord channel then copy the link and paste it here `
            );
         return interaction.reply({ embeds: [invalidlinkembedd], ephemeral: true });
        }

        if (!imageurl.endsWith('.jpg') && !imageurl.endsWith('.png')) {
         return  interaction.reply({
            embeds: [new MessageEmbed().setColor('BLUE').setDescription(`Image urls ending with jpg or png only are accepted`)],
            ephemeral: true,
          });
        }
      }
      const image = imageurl;
      const sayembed = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setTitle('NEW ANNOUNCEMENT')
        .setDescription(text)
        .setImage(image)
        .setTimestamp()
        .setFooter({ text: 'Announced By ShastriClone' });

      if (role) {
        channel.send({ content: `${role}`, embeds: [sayembed] }).then((msg) => {
          msg.react(`✅`);
          msg.react(`⛔`);
          return interaction.reply({
            embeds: [new MessageEmbed().setColor('DARKER_GREY').setDescription(`✅ Your Announcement is now live in ${channel}`)],
            ephemeral: true,
          });
        });
      } else {
        channel.send({ embeds: [sayembed] }).then((msg) => {
          msg.react(`✅`);
          msg.react(`⛔`);
          return interaction.reply({
            embeds: [new MessageEmbed().setColor('DARKER_GREY').setDescription(`✅ Your Announcement is now live in ${channel}`)],
            ephemeral: true,
          });
        });
      }
    }
  },
};
