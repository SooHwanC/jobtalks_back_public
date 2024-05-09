const express = require('express');
const router = express.Router();
const Member = require('../schemas/member');

router.post('/join', async (req, res, next) => {
    try {
        const { member_id, password } = req.body;
        const member = await Member.findOne
            ({ member_id });
        if (member) {
            return res.status(409).send('이미 존재하는 회원입니다.');
        }
        await Member.create({ member_id, password });
        return res.status(200).send('회원가입 성공');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { member_id, password } = req.body;
        const member = await Member.findOne
            ({ member_id });
        if (!member) {
            return res.status(404).send('회원이 존재하지 않습니다.');
        }
        if (member.password !== password) {
            return res.status(403).send('비밀번호가 일치하지 않습니다.');
        }
        return res.status(200).send('로그인 성공');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/coin', async (req, res, next) => {
    try {
        const { member_id } = req.body;
        const member = await Member.findOne({ member_id });
        return res.status(200).send(member);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
