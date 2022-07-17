const { MessageEmbed, CommandInteraction } = require("discord.js")
module.exports = {
    name: 'toss',
    description: 'Tossess a coin',
    type: 'Fun',
    perms: 'everyone',
    usage: '/toss',
    /**
*
* @param {Client} client
* @param {CommandInteraction} interaction
* @param {String[]} args
*/
    async run(client, interaction, args) {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const rndInt = randomIntFromInterval(1, 2)
        console.log(rndInt)
        if (rndInt == 1) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor('BLUE')
                        .setDescription(` \n **Its HEADS **`)
                ]
            })
        } else {
            return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor('BLUE')
                        .setDescription(` \n **Its TAILS **`)
                ]
            })
        }

    }
}