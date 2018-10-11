const app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 3000;
const {connect : connectToDB} = require('./utils/dbUtils');

connectToDB();

http
    .createServer(app)
    .listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
    