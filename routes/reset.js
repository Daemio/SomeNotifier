const express = require('express');
const router = express.Router();
const {removeAllTasks} = require('../utils/dbUtils')
const logger = require('../logger')

router.get('/', async function (req, res, next) {
    try {
        await removeAllTasks();

        logger.info('Service has been reset and now is ready for new notification')
        return res.status(200).json({ message: 'Service is ready for new notification' });
    } catch (err) {
        logger.error(`/reset failed due to reason:\n${JSON.stringify(err)}`);
        return res.status(500).json({ error: err });
    }
})

module.exports = router;