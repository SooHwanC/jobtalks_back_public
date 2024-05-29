const mongoose = require('mongoose');

const { Schema } = mongoose;

const talent_history = new Schema({
    member_id: {
        type: String,
        required: true,
    },
    user_text: {
        type: String,
        required: true,
    },
    gpt_answer: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    answer_type: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Talent_history', talent_history);
