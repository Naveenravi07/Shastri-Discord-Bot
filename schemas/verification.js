const mongoose = require('mongoose');

const verification = new mongoose.Schema({
    guildid: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('verification-schema', verification);
