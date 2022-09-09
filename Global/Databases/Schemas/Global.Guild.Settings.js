const mongoose = require('mongoose')

const schema = mongoose.model('Guild', new mongoose.Schema({
    _id: String,
    guildID: String,
    Date: {type: Date, default: Date.now()},
    Ayarlar: {type: Object, default: {
        staff: ["628978900604682243", "417603398813089793"]
    }},
    talentPerms: Object,
}));

module.exports = schema;