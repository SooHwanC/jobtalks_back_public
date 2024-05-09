const express = require('express');
const router = express.Router();
const axios = require('axios');
const Member = require('../schemas/member');

router.get('/oauth', async (req, res) => {
    const BACK_URI = process.env.BACK_URI;
    const FRONT_URI = process.env.FRONT_URI;
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    const code = req.query.code;
    let token;
    let user;
    try {
        token = await axios({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                grant_type: 'authorization_code',
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: `${BACK_URI}/google/oauth`,
                code: code,
            },
        });
    } catch (error) {
        console.error(error);
    }


    try {
        user = await axios({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v1/userinfo',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
    } catch (error) {
        console.error(error);
    }

    // console.log('user:', user.data);

    const member = await Member.findOne({ member_id: user.data.id });
    if (!member) {
        await Member.create({
            member_id: user.data.id,
            password: user.data.id,
        });
    }

    return res.redirect(`${FRONT_URI}/auth_google?member_id=${user.data.id}`);

});


module.exports = router;
