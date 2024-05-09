const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
    company_name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    talent: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Company', companySchema);
