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
    username:{
        type:String
    },
    bank: {
        type: Number,
        required: true,
    },
    wallet: {
        type: Number,
    },
    items: [
        {
            type: String
        }
    ],
    robbedTime:{
        type:Date,
    }

});
module.exports = mongoose.model('profile-schema', profileschema);
