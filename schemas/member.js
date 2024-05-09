const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberySchema = new Schema({
    member_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    coin: {
        type: Number,
        default: 0,
    },

});

module.exports = mongoose.model('Member', memberySchema);
