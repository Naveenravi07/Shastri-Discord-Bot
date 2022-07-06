const mongoose = require("mongoose")

const commandschema = new mongoose.Schema({
    command: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    perms: {
        type: String,
        required: true
    },
    usage:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('commands-schema', commandschema)