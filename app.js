'use strict';

const sequelize = require("./config/db/mysql");
const associations = require('./models/mysql/index');

const logger = require('./config/logger');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const restContenxt = '/api';

const UserRoute = require('./routes/user-route');
const TokenRoute = require('./routes/token-route');
const TestRoute = require('./routes/test-route');
const LoginRoute = require('./routes/login-route');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(restContenxt, UserRoute);
app.use(restContenxt, TokenRoute);
app.use(restContenxt, TestRoute);
app.use(restContenxt, LoginRoute);

app.use((err, req, res, next) => {
    // log the error...
    console.log('global function');
});


sequelize
    .authenticate()
    .then(() => {
        logger.info({message: 'connected to database'});
        app.listen(3000, () => {
            console.log('Server started');
        });
    })
    .catch(error => {
        console.error(error);
    });