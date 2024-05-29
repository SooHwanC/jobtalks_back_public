const express = require('express');
const router = express.Router();
const Talent_history = require('../schemas/talent_history');
const company = require('../schemas/company');

router.post('/job', async (req, res, next) => {
    try {
        const { member_id, user_text, gpt_answer, company_name } = req.body;
        const answer_type = 'job';
        const createdRecord = await Talent_history.create({ member_id, user_text, gpt_answer, company_name, answer_type });
        return res.status(200).send(createdRecord.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/talent', async (req, res, next) => {
    try {
        const { member_id, user_text, gpt_answer, company_name } = req.body;
        const answer_type = 'talent';
        const createdRecord = await Talent_history.create({ member_id, user_text, gpt_answer, company_name, answer_type });
        return res.status(200).send(createdRecord.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/getAnswer', async (req, res, next) => {
    try {
        const { id } = req.body;
        const history = await Talent_history.find({ _id: id });
        const company_name = history[0].company_name;
        const talent = await company.find({ company_name: company_name });
        return res.status(200).send([history[0], talent[0]]);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.post('/getAllAnswer', async (req, res, next) => {
    try {
        const { member_id } = req.body;
        const history = await Talent_history.find({ member_id: member_id });
        return res.status(200).send(history);
    } catch (error) {
        console.error(error);
        next(error);
    }
});




module.exports = router;
