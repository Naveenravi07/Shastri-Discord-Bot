const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns websocket ping",
    type: 'information',
    perms:'everyone',
    usage:'/ping',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply({ content: `${client.ws.ping}ms!`,ephemeral:true });
    },
};
