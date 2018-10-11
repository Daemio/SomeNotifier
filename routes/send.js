const express = require('express');
const router = express.Router();
const notify = require('../utils/notify');

router.get('/', async function (req, res, next) { //TODO
    const template = req.query.template;

    if(!template) {
        res.status(400).json({message: 'no template provided'});
        return;
    }

    notify(template);

    res.status(200).json({message: "Players are being notified"});
});

module.exports = router;