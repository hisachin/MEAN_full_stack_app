import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
    globalErrorHandler,
    notFoundErrorHandler
}
from './backend/utils';

const apiRoute = require('./backend/routes/routes');

const app = express();

const port = process.env.PORT || 5000;

let mongoURL = 'mongodb://localhost/lynkit'

mongoose.connect(mongoURL,{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(data => {
    console.log('DB Coneccted..');

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(express.static(__dirname + '/dist/star-admin-angular'));

    app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

    app.use('/api', apiRoute);

    //manage global not found error handling
    app.use(notFoundErrorHandler);

    //manage global error handling
    app.use(globalErrorHandler);

    const server = http.createServer(app);

    server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
}).catch(error => {
    console.log(error);
});