const client = require('../index');
const sourcebin = require('sourcebin');
const { create } = sourcebin;
const { MessageEmbed, Modal, TextInputComponent, MessageActionRow } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  //Start
  let author = interaction.member.user.username;
  let code = interaction.fields.getTextInputValue('code');
  let msg = interaction.fields.getTextInputValue('description');
  const str = interaction.fields.getTextInputValue('language');
  const arr = str.split(' ');

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const language = arr.join(' ');
  console.log(language);

  if (msg) {
    await interaction.reply({
      embeds: [new MessageEmbed().setColor('BLUE').setDescription(`Uploading Your Code .....`)],
      ephemeral: true,
    });

    create(
      [
        {
          name: author,
          content: code,
          language: `${language}`,
        },
      ],
      {
        title: 'Shastri Clone :beginner: Source Bin',
        description: msg,
      }
    )
      .then((value) => {
        const resultembedd = new MessageEmbed()
          .setColor('BLUE')
          .setDescription(`Your code has been posted successfully and is now live on ${value.url}`)
          .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }));

        interaction.editReply({ embeds: [resultembedd] });
      })
      .catch((err) => {
        interaction.editReply({
          embeds: [new MessageEmbed().setColor('BLUE').setDescription('Error make sure you spelt the language correctly without spaces')],
        });
      });
  } else {
    await interaction.reply(`Uploading Your Code .....`);
    create(
      [
        {
          name: author,
          content: code,
          language: language,
        },
      ],
      {
        title: 'Shastri Clone :beginner: Source Bin',
        description: 'Help',
      }
    )
      .then((value) => {
        const resultembedd = new MessageEmbed()
          .setColor('BLUE')
          .setDescription(`Your code has been posted successfully and is now live on ${value.url}`)
          .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }));
        interaction.editReply({ embeds: [resultembedd] });
      })
      .catch((err) => {
        interaction.editReply({
          embeds: [new MessageEmbed().setColor('BLUE').setDescription('Error make sure you spelt the language correctly without spaces')],
        });
      });
  }
});
