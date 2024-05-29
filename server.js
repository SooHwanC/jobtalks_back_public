require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const connect = require('./schemas');

connect();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/company', require('./routes/companyRouter'));
app.use('/member', require('./routes/memberRouter'));
app.use('/talent_history', require('./routes/talent_historyRouter'));
app.use('/essay_history', require('./routes/essay_historyRouter'));
app.use('/kakao', require('./routes/kakaoRouter'));
app.use('/google', require('./routes/googleRouter'));

app.listen(8088, () => {
    console.log("8088 진입");
});