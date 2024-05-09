const express = require('express');
const router = express.Router();
const Orion_history = require('../schemas/orion_history');

router.post('/save', async (req, res, next) => {
    try {
        const { member_id, gpt_answer} = req.body;
        const createdRecord = await Orion_history.create({ member_id, gpt_answer});
        return res.status(200).send(createdRecord.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/getAnswer', async (req, res, next) => {
    try {
        const { id } = req.body;
        const history = await Orion_history.find({ _id: id });
        return res.status(200).send(history[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/getAllAnswer', async (req, res, next) => {
    try {
        const { member_id } = req.body;
        const history = await Orion_history.find({ member_id });
        return res.status(200).send(history);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
