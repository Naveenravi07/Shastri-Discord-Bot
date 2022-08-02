const { glob } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { Types } = mongoose;
const commandschema = require('../schemas/commandschema');
const table = require("ascii-table")
const globPromise = promisify(glob);

var AsciTable = new table('Shastri Clone')
AsciTable.setHeading('Index', 'Commands', 'Status')
/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Ivide Und Monee Prblm is simultaneosly upload and delete 
  //  await commandschema.remove({})


  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split('/');
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);

  const arrayOfSlashCommands = [];
  slashCommands.map(async (value, index) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    AsciTable.addRow(index + 1, file.name, '✅')

    // await commandschema.updateMany(
    //   {
    //     _id: new Types.ObjectId(),
    //   },
    //   {
    //     command: file.name,
    //     description: file.description,
    //     type: file.type,
    //     perms: file.perms,
    //     usage: file.usage,
    //   },
    //   {
    //     upsert: true,
    //   }
    // );
    if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);

  });
  console.log(AsciTable.toString());
  client.on('ready', async () => {
    // Register for a single guild
    // await client.guilds.cache.get('909123885977456681').commands.set(arrayOfSlashCommands);

    // Register for all the guilds the bot is in
    await client.application.commands.set(arrayOfSlashCommands);
  });

  // mongoose
};
