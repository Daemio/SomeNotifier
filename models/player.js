const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vk_id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Player', playerSchema);