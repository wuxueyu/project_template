'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
require('./lib/mongo')
require('./lib/util')
const router = require('./router');
const env = require('./env');
const conf = new env();
const log = require('./models/log4js');
const logger = log.log4js.getLogger('service');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

process.on("uncaughtException", (e) => {
    logger.info(e.stack);
});
app.listen(conf.port, () => {
    logger.info(`app listening ${conf.port}`);
});
module.exports = app;