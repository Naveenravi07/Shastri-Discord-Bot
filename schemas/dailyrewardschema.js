const mongoose = require("mongoose")

const dailyschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    guildid: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        expires:172800
    },
    reward: {
        type: String,
    },
})
module.exports = mongoose.model('daily-schema', dailyschema)