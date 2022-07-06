const { Client, Collection } = require('discord.js');
const db = require('./Database/dbConnect');
const {DisTube}=require("distube")
const {SpotifyPlugin}=require("@distube/spotify")
const client = new Client({
  intents: 32767,
});


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json');

//Music
client.distube=new DisTube(client,{
  emitNewSongOnly:true,
  leaveOnFinish:true,
  emitAddListWhenCreatingQueue:false,
  plugins:[new SpotifyPlugin()]
})

db.connectDb();
// Initializing the project
// require('./handler')(client);
["index", "DistubeEvents"].forEach(h => {
  require(`./handler/${h}`)(client)
})
module.exports = client;
client.login(client.config.token);
