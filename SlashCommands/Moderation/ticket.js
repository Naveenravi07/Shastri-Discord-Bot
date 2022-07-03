const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { clientid, banlogs, unbanlogchannel } = require('../../config.json');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Discord.Collection();

module.exports = {
  name: 'ticket',
  description: 'Ticket System For Discord Servers',
  usage: '.ticket',
  permissions: 'administrator',

  async run(client, interaction, args) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      interaction.reply({ embeds: [new MessageEmbed().setColor('BLUE').setDescription(`You Do not have permissions to use this command`)], ephemeral: true });
    } else {
      const tcktembedd = new MessageEmbed();
      tcktembedd
        .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setColor('RED')
        .setTitle('Raise A Ticket 💁')
        .setDescription(
          '__*** How to make a ticket ***__\n\n\n' + ' > Click on the button below saying  `Create Ticket` \n' + '> Once the ticket is made you will be able to type and ask for support there'
        )
        .setFooter(`Ticket By Shastri ${interaction.member.user.username}`)
        .setTimestamp();

      const bt = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('tic').setLabel('Create Ticket 📘').setStyle('PRIMARY'));
      interaction.reply({ embeds: [tcktembedd], components: [bt] });
    }
  },
};
