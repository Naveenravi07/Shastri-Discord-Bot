const discord = require('discord.js');
const random = require('something-random-on-discord').Random;
let { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'meme',
  description: 'sends a meme',
  perms: 'everyone',
  usage: '/meme',
  type:'Fun',
  async run(client, interaction, args) {
    try {
      let data = await random.getMeme();
      interaction.reply({ embeds: [data.embed] });
    } catch {
      interaction.reply({
        embeds: [new MessageEmbed().setDescription('Something Wrong With Api. Please Report the bug by ```/bug``` ').setColor('BLUE')],
        ephemeral: true,
      });
    }
  },
};
