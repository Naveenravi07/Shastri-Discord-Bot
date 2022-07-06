const discord = require('discord.js');
const { Clinet, Message, MessageEmbed, CommandInteraction } = require('discord.js');
module.exports = {
  name: 'gay',
  description: 'Shows the Chance Of Being A Gay',
  type: 'Fun',
  perms: 'Everyone',
  usage: '/gay',
  options: [
    {
      name: 'mention',
      description: 'Mention a user',
      type: 'USER',
      required: false,
    },
  ],
  async run(client, interaction, args) {
    const gayguy = interaction.options.getUser('mention');
    if (!gayguy) {
      const gay = Math.floor(Math.random() * 101);
      const gayembed = new MessageEmbed()
        .setTitle(`Gay Test`)
        .setDescription(`<@${interaction.member.id}> Is Literally ${gay} % Gay  `)
        .setColor('YELLOW')
        .setTimestamp()
        .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }));
      return interaction.reply({ embeds: [gayembed], ephemeral: false });
    } else {
      const gay = Math.floor(Math.random() * 101);
      const gayembed = new MessageEmbed()
        .setTitle(`Gay Test`)
        .setDescription(`<@${gayguy.id}> Is Literally ${gay} % Gay  `)
        .setColor('YELLOW')
        .setTimestamp()
        .setThumbnail(gayguy.displayAvatarURL({ format: 'png' }));
      return interaction.reply({ embeds: [gayembed], ephemeral: false });
    }
  },
};
