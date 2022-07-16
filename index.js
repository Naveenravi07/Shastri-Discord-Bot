const { Client, Collection } = require('discord.js');
const db = require('./Database/dbConnect');
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const client = new Client({
  intents: 32767,
});
const config = require('./config.js');
const DarkDashboard = require('dbd-dark-dashboard');
const DBD = require("discord-dashboard");
const cmdschema = require('./schemas/commandschema')
const DBfunctions = require("./Functions/Getcmdinfo")
// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json');

//Music
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddListWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
})

db.connectDb();
// Initializing the project
// require('./handler')(client);
["index", "DistubeEvents"].forEach(h => {
  require(`./handler/${h}`)(client)
})


let langsSettings = {};
/* --- DASHBOARD --- */
(async () => {
  DBfunctions.getmodcmd().then((data2) => {

    modcm = data2
  }).catch((error) => {
    console.log(error);
  });
  DBfunctions.getfuncmd().then((data) => {

    funcm = data
  }).catch((error) => {
    console.log(error);
  });

  DBfunctions.getUtilcmd().then((data3) => {

    utilcm = data3;
  }).catch((Err) => {
    console.log(Err);
  })

  DBfunctions.getInfocmd().then((data4) => {

    infocm = data4;
  }).catch((Err) => {
    console.log(Err);
  })


  let DBD = require('discord-dashboard');
  await DBD.useLicense(config.dbd_license);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    port: 80,
    client: {
      id: config.discord.client_id,
      secret: config.discord.client_secret
    },
    redirectUri: config.redirect_uri,
    domain: 'http://localhost',
    bot: client,
    theme: DarkDashboard({ DarkDashboard }),
    theme: DarkDashboard({
      information: {
        createdBy: "Shastri",
        websiteTitle: "ShastriClone",
        websiteName: "Shastri Clone",
        websiteUrl: "https:/www.naveenravi.com/",
        dashboardUrl: "http://localhost:3000/",
        supportServer: "https://discord.gg/y8FwHxdnM4",
        imageFavicon: "https://external-preview.redd.it/SVGUOGm7cqu-NXV5I3lEaEz3OfmCm3II3pINCfxWJk8.png?auto=webp&s=817448de307f4ef8fcd2bdb042cb28f3a67fbfe4",
        iconURL: "https://external-preview.redd.it/SVGUOGm7cqu-NXV5I3lEaEz3OfmCm3II3pINCfxWJk8.png?auto=webp&s=817448de307f4ef8fcd2bdb042cb28f3a67fbfe4",
        loggedIn: "Successfully signed in.",
        mainColor: "#2CA8FF",
        subColor: "#ebdbdb",
        preloader: "Loading..."
      },

      index: {
        card: {
          category: "Shastri Clones's Panel - The center of everything",
          title: `Welcome to the ShastriClone Web where you can control the core features to the bot.`,
          image: "https://i.imgur.com/axnP93g.png",
          footer: "Footer",
        },

        information: {
          category: "Category",
          title: "Information",
          description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
          footer: "Footer",
        },

        feeds: {
          category: "Category",
          title: "Information",
          description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
          footer: "Footer",
        },
      },
      commands: [
        // Moderation

        {
          category: `Moderation`,
          subTitle: `Moderation Commands`,
          list: modcm.map(item => ({
            commandName: item.command,
            commandUsage: item.usage,
            commandDescription: item.description,
            commandAlias: 'None',
          }))
        },

        {
          category: 'Music',
          subTitle: 'Music Commands',
          list: [{
            commandName: 'music play',
            commandUsage: `/music play`,
            commandDescription: `	Plays a requested song `,
            commandAlias: 'None'
          },
          {
            commandName: "music settings",
            commandUsage: "/music settings",
            commandDescription: "Includes many options like skip,pause,resume.shuffle,view queue etc.",
            commandAlias: "None",
          },
          {
            commandName: "music volume",
            commandUsage: "/music volume",
            commandDescription: "Changes the volume to given input",
            commandAlias: "None",
          },
          ],
        },
        {
          category: `Fun `,
          subTitle: `Fun Commands`,
          list: funcm.map(item => ({
            commandName: item.command,
            commandUsage: item.usage,
            commandDescription: item.description,
            commandAlias: 'None',
          }))
        },
        {
          category: `Utility`,
          subTitle: `Utility Commands`,
          list: utilcm.map(item => ({
            commandName: item.command,
            commandUsage: item.usage,
            commandDescription: item.description,
            commandAlias: 'None',
          }))
        },
        {
          category: `Information`,
          subTitle: `Information Commands`,
          list: infocm.map(item => ({
            commandName: item.command,
            commandUsage: item.usage,
            commandDescription: item.description,
            commandAlias: 'None',
          }))
        },


      ],
    }),

    settings: [
      {
        categoryId: 'setup',
        categoryName: "Setup",
        categoryDescription: "Setup your bot with default settings!",
        categoryOptionsList: [
          {
            optionId: 'lang',
            optionName: "Language",
            optionDescription: "Change bot's language easily",
            optionType: DBD.formTypes.select({ "Polish": 'pl', "English": 'en', "French": 'fr' }),
            getActualSet: async ({ guild }) => {
              return langsSettings[guild.id] || null;
            },
            setNew: async ({ guild, newData }) => {
              langsSettings[guild.id] = newData;
              return;
            }
          },
        ]
      },
    ]
  });
  Dashboard.init();
})();

module.exports = client;
client.login(client.config.token);
