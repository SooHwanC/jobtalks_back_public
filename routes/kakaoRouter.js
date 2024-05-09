const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');
const Member = require('../schemas/member');

router.get('/oauth', async (req, res, next) => {
    const BACK_URI = process.env.BACK_URI;
    const FRONT_URI = process.env.FRONT_URI;
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
    const code = req.query.code;
    let token;
    let user;
    try {
        token = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: KAKAO_CLIENT_ID,
                redirect_uri: `${BACK_URI}/kakao/oauth`,
                code: code,
            }),
        });

    } catch (error) {
        console.error(error);
        next(error);
    }

    try {
        user = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);

    }

    // console.log('유저확인', user);

    const member = await Member.findOne({ member_id: user.data.id });
    if (!member) {
        await Member.create({
            member_id: user.data.id,
            password: user.data.id,
        });
    }

    return res.redirect(`${FRONT_URI}/auth_kakao?member_id=${user.data.id}`);

});



module.exports = router;
