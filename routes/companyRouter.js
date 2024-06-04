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

router.post('/insert', async (req, res, next) => {
    try {
        const { company_name, talent } = req.body;
        logo = 'none';
        console.log('이름확인', company_name);
        console.log('인재상 확인', talent);
        Company.create({ company_name, logo, talent })
        return res.status(200).send('저장 성공');

    } catch (error) {
        console.error(error);
        next(error);
    }


})

module.exports = router;
