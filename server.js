const app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 3000;
const {connect : connectToDB} = require('./utils/dbUtils');
const logger = require('./logger');

connectToDB();

http
    .createServer(app)
    .listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });
    