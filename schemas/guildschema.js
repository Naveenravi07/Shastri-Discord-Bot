const mongoose = require('mongoose');

const guildschema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  guildid: {
    type: Number,
    required: true,
  },
  guildname: {
    type: String,
    required: true,
  },
  membercount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model('guild-schema', guildschema);
