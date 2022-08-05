const cmdchema = require("../schemas/commandschema")
module.exports = {
    
    getAllcmds: () => {
        return new Promise(async (resolve, reject) => {
            let cmds = await cmdchema.find()
            resolve(cmds)
        })
    }
}