const sourcebin = require('sourcebin');
const { create } = sourcebin;
const { MessageEmbed, Modal, TextInputComponent, MessageActionRow } = require('discord.js');
module.exports = {
  name: 'bin',
  description: 'Uploads Your Code To Source Bin And Gives You The Link',
  type: 'Utility',
  usage:'/bin',
  perms:'everyone',

  async run(client, interaction, args) {
    const modal = new Modal().setCustomId('bin').setTitle('SoureBin');
    const codeinput = new TextInputComponent().setCustomId('code').setLabel('The code to be uploaded').setStyle('PARAGRAPH').setRequired()
    const langInput = new TextInputComponent().setCustomId('language').setLabel('Language you used in the code').setStyle('SHORT').setRequired()

    const description = new TextInputComponent().setCustomId('description').setLabel('Explain issue with code').setStyle('SHORT');

    const firstActionRow = new MessageActionRow().addComponents(codeinput);
    const secondActionRow = new MessageActionRow().addComponents(langInput);
    const thirdActionRow = new MessageActionRow().addComponents(description);
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    await interaction.showModal(modal);
  },
};
