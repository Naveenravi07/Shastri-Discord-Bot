let { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const profileschema=require("../../schemas/profileschema")

    module.exports = {
        name: 'work',
        description: 'Work for some extra money',
        type: 'Economy',
        perms: 'everyone',
        usage: '/work',
        /**
    *
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
        async run(client, interaction, args) {

        }
    }