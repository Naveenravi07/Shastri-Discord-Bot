const mongoose = require('mongoose');

const suggestschema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    guildid: {
        type: Number,
        required: true,
    },
    suggestChannel: {
        type: Integer,
        required: true
    }
});
module.exports = mongoose.model('suggest-schema', suggestschema);
