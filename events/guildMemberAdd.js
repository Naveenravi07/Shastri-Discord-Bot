const client = require('../index')
const profileschema = require('../schemas/profileschema');
client.on("guildMemberAdd", async(member) => {
    await profileschema.findOneAndUpdate(
        {
            
        },
        {
            guildid: member.guild.id,
            userid: member.id,
            bank: 1000,
            wallet:0

        },
        {
            upsert: true
        }
    )
})