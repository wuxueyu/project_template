'use strict';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const log = require('../models/log4js')
const logger = log.log4js.getLogger('service')
const config = require('../env');
const conf = new config();
const path = require('path')
const opts = { server: { auto_reconnect: true } };

opts.db = {
    "readPreference": "secondaryPreferred"
};
mongoose.connection = mongoose.createConnection(conf.mongo_uri + conf.database, opts);

mongoose.connection.on('error', (error) => logger.error(`Failed to connect mongodb:${error}`));
mongoose.connection.on('open', () => {
    logger.info(`Mongodb connected!${conf.mongo_uri}:${conf.database}`);
});

exports.connection = mongoose.connection;