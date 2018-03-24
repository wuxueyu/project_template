'use strict';
const log = require('../models/log4js')
const logger = log.log4js.getLogger('service');
const lodash = require('lodash')


module.exports = function(req, res, next) {
    if (!req.mgrHook || !req.mgrHook.task) {
        logger.info(`hook信息缺失`);
        return next();
    }

    req.mgrHook.task.then((result) => {
        if (req.mgrHook.callback) {
            req.mgrHook.callback(result, req, res);
        }
        return jsonResponse(res, result, req)

    }).catch((err) => {
        if (lodash.has(err, "error_code")) {

            return errorRequest(req, res, err)
        }
        return errorRequest(req, res, err.message)

    });
}