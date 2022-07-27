const mongoose = require('mongoose');

const profileschema = new mongoose.Schema({
    guildid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    bank: {
        type: Number,
        required: true,
    },
    wallet: {
        type: Number,
    }
});
module.exports = mongoose.model('profile-schema', profileschema);
