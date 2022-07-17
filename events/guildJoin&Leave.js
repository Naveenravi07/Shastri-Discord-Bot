const client = require('../index');
const guildschema = require('../schemas/guildschema');
const profileschema = require("../schemas/profileschema")
client.on('guildCreate', async (guild) => {
  let id = guild.id;
  let servername = guild.name;
  let membercount = guild.memberCount;
  await guildschema.findOneAndUpdate({ _id: id }, { guildid: id, guildname: servername, membercount: membercount }, { upsert: true }).catch((err) => {
    console.log(err);
  });
});

client.on('guildDelete', async (guild) => {
  console.log(guild.id);
  let id = guild.id;
  await guildschema.findOneAndDelete({ guildid: id });
});
