const mongoose = require('mongoose');

const { Schema } = mongoose;

const essay_history = new Schema({
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

module.exports = mongoose.model('Essay_history', essay_history);
