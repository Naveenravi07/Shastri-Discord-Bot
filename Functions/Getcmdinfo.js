const cmdchema = require("../schemas/commandschema")
module.exports = {
    getfuncmd: () => {
        return new Promise(async (resolve, reject) => {
            let funcmds = await cmdchema.find({ type: "Fun" })
            resolve(funcmds)
        })
    },
    getmodcmd: () => {
        return new Promise(async (resolve, reject) => {
            let modcmds = await cmdchema.find({ type: "Moderation" })
            resolve(modcmds)
        })
    },
    getUtilcmd: () => {
        return new Promise(async (resolve, reject) => {
            let utilcmd = await cmdchema.find({ type: "Utility" })
            resolve(utilcmd)
        })
    },
    getInfocmd: () => {
        return new Promise(async (resolve, reject) => {
            let infocmd = await cmdchema.find({ type: "information" })
            resolve(infocmd)
        })
    }
}