const express = require('express');
const cors = require('cors');
const mongoClient = require('./database.js');

const verifyToken = require('./verifyToken.js')
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');

(async () => {
    const app = express();
    await mongoClient.connect();

    app.use(cors());
    app.use(express.json());

    app.use('/', indexRouter);
    app.use('/blog', verifyToken, blogRouter);

    app.listen(3333, () => console.log('server is running'))

})()
