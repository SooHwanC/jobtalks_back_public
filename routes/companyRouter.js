const express = require('express');
const router = express.Router();
const Company = require('../schemas/company');

router.get('/companies', async (req, res, next) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
