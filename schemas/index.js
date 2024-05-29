const mongoose = require('mongoose');
const MONGOOSE_ID = process.env.MONGOOSE_ID;

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }

        mongoose.connect(`${MONGOOSE_ID}`, {
            dbName: 'jobtalks',
        })
            .then(() => {
                console.log("몽고디비 연결 성공");
            })
            .catch((error) => {
                console.log("몽고디비 연결 에러", error);
            });

    }

    connect();

    mongoose.connection.on('error', (error) => {
        console.error("몽고디비 연결 에러", error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
        connect();
    });


    require('./company');
    require('./member');
    require('./talent_history');
    require('./essay_history');


}