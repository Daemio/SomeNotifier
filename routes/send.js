const express = require('express');
const router = express.Router();
const vkApi = require('someapistub');

router.get('/', async function (req, res, next) { //TODO
    let data;
    try{
        data = await vkApi.sendNotification([1,2,3,4], "hi");
    } catch(err) {
        console.log(err);
    }

    console.log(data);
});

module.exports = router;