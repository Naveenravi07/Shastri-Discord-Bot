const client = require('../index')
const guildschema = require('../schemas/guildschema');
const profileschema = require('../schemas/profileschema');
client.on("guildMemberRemove", async(member) => {
    await profileschema.findOneAndDelete(
     {
        userid:member.user.id
     }
    )
})