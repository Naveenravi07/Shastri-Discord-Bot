const { Client, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'music',
  description: 'Play Pause stop loop shuffle and many more music commands',
  perms: 'everyone',
  type: 'Music',
  usage: '/music',
  options: [
    {
      name: 'play',
      description: 'Plays a song',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'query',
          description: 'Provide the song name or url',
          type: 'STRING',
          required: true,
        },
      ],
    },
    {
      name: 'volume',
      description: 'Sets the volume of the song (1-100)',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'percent',
          description: 'Provide a volume percentage for the song. Default is 50%',
          type: 'INTEGER',
          required: true,
        },
      ],
    },
    {
      name: 'settings',
      description: 'Select an option',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'options',
          description: 'Select an option to continue',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: '⏩ Skip Song',
              value: 'skip',
            },
            {
              name: '⏸️ Pause Song',
              value: 'pause',
            },
            {
              name: '▶️ Resume Song ',
              value: 'resume',
            },
            {
              name: '⏹ Stop Music',
              value: 'stop',
            },
            {
              name: '🔢 View Queue',
              value: 'queue'
            },
            {
              name: '🔀Shuffle Queue',
              value: 'shuffle'
            },
            {
              name: '🔃Autoplay Modes',
              value: 'autoplay'
            },
            {
              name: '🔂 Add A Related Song',
              value: 'relatedsong'
            },
            {
              name: ' ♋ Toggle Repeat Mode',
              value: 'repeatmode'
            }
          ],
        },
      ],
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  async run(client, interaction, args) {
    const { guild, member, options, channel } = interaction;
    const voicechannel = member.voice.channel;
    if (!voicechannel) {
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('BLUE').setDescription('You need to be in a voice channel to use this command')],
        ephemeral: true,
      });
    }
    if (guild.me.voice.channelId && voicechannel.id !== guild.me.voice.channelId) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Music is already being played in ${guild.me.voice.channelId}, You need to be in same voice channel as me `),
        ],
        ephemeral: true,
      });
    }

    try {
      switch (options.getSubcommand()) {

        case 'play': {
          client.distube.play(voicechannel, options.getString('query'),
            { textChannel: channel, member: member });
          return interaction.reply(
            {
              embeds: [new MessageEmbed().setColor('BLUE').setDescription(`🎵-Request recevied`)],
              ephemeral: true
            });
        }
        case 'volume': {
          const volume = options.getInteger('percent')
          if (volume > 100 || volume < 1) {
            return interaction.reply({
              embeds: [
                new MessageEmbed().setColor("BLUE").setDescription(`Volume Must Be Between 1 and 100`)
              ], ephemeral: true
            })
          }

          client.distube.setVolume(voicechannel, volume)
          return interaction.reply({
            embeds: [
              new MessageEmbed().setColor("BLUE").setDescription(`Volume is now set to ** ${volume} Percent** `)
            ], ephemeral: true
          })
        }

        case 'settings': {
          const queue = await client.distube.getQueue(voicechannel)
          if (!queue) return interaction.reply({
            embeds: [
              new MessageEmbed().setColor("BLUE").setDescription(`There is no active queue`)
            ]
          })

          switch (options.getString('options')) {

            case 'skip': {
              await queue.skip(voicechannel)
              return interaction.reply({
                embeds: [
                  new MessageEmbed().setColor("BLUE").setDescription(`⏩ Skipped The Current Song`)
                ], ephemeral: true
              })
            }
            case 'stop': {
              await queue.stop(voicechannel)
              return interaction.reply({
                embeds: [
                  new MessageEmbed().setColor("BLUE").setDescription(`Music has been stopped`)
                ], ephemeral: true
              })
            }

            case 'pause': {
              await queue.pause(voicechannel)
              return interaction.reply({
                embeds: [
                  new MessageEmbed().setColor("BLUE").setDescription(`Music has been paused `)
                ], ephemeral: true
              })
            }
            case 'resume': {
              await queue.resume(voicechannel)
              return interaction.reply({
                embeds: [
                  new MessageEmbed().setColor("BLUE").setDescription("Music has been resumed")
                ], ephemeral: true
              })
            }
            case 'queue': {
              return interaction.reply({
                embeds: [
                  new MessageEmbed().setColor("BLUE").setTitle(`Queue of ${interaction.guild.name}`)
                    .setDescription(`${queue.songs.map((song, id) => `\n **${id + 1}**. ${song.name} -\` ${song.formattedDuration}\``
                    )}`)
                    .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                ]
              })
            }

            case 'shuffle': {
              await queue.shuffle(voicechannel)
              return interaction.reply({
                embeds: [new MessageEmbed()
                  .setColor("BLUE").setDescription("The queue has been shuffled ✅")
                ]
              })
            }

            case 'autoplay': {
              let Mode = await queue.toggleAutoplay(voicechannel)
              return interaction.reply({
                embeds: [
                  new MessageEmbed().setColor("BLUE")
                    .setDescription(`AutoPlay mode is set to **${Mode ? "On" : "Off"} **`)
                ]
              })
            }

            case'relatedsong':{
              await queue.addRelatedSong(voicechannel)
              return interaction.reply({embeds:[
                new MessageEmbed().setColor("BLUE").setDescription("Related song has been added to the queue")
              ]})
            }

            case'repeatmode':{
              let mode2=await client.distube.setRepeatMode(queue)

              return interaction.reply({embeds:[
                new MessageEmbed().setColor("BLUE")
                .setDescription(`Repeat Mode is now set to **${mode2=mode2?mode2==2?"Queue":"Song":"Off"}**`)
              ]})
            }
          }
        }
      }
    } catch (err) { }
  },
};
