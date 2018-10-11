const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    offset: {
        type: Number,
        required: true,
        unique: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    ids: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);