const mongoose = require('mongoose');

const { Schema } = mongoose;

const orion_history = new Schema({
    member_id: {
        type: String,
        required: true,
    },
    gpt_answer: {
        type: Array,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Orion_history', orion_history);
