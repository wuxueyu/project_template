const Code = require('./error_code');
const util = require('util');
const log = require('../models/log4js');
const logger = log.log4js.getLogger('service')
const lodash = require('lodash')

global.jsonResponse = function(response, result, req) {
    if (util.isArray(result)) {
        for (var key in result) {
            if (!util.isUndefined(result[key]._id)) {
                result[key].id = result[key]._id;
                delete result[key]._id;
            }
            delete result[key].__v;
            delete result[key].password;
            delete result[key].counter_data;
        }

        let res_result = { result: result, error_code: 0 };
        return response.json(res_result);
    }

    if (!util.isUndefined(result._id)) {
        delete result._id;
        delete result.__v;
    }
    let res_result = { result: result, error_code: 0 };
    req.res_result = res_result;

    return response.json(res_result);
};

// error request handle
global.errorRequest = function(req, res, msg) {
    var code = 200;

    if (!util.isUndefined(msg.error_code)) {
        var error_msg = Object.assign({}, msg);

        if (arguments.length > 3 && error_msg.error_msg.indexOf('%s') > 0) {
            for (var key in arguments) {
                if (0 == key || 1 == key || 2 == key) continue;
                //error_msg.desc = util.format(error_msg.desc, arguments[key]);
                error_msg.error_msg = util.format(error_msg.error_msg, arguments[key]);
            }
        }

        error_msg.request = req.url;
        delete error_msg.desc;

        req.error_msg = error_msg;
        return res.status(code).json(error_msg);
    }

    var sys_msg = lodash.merge({}, Code.SYSTEM_ERROR);

    if (typeof msg === 'string') {
        sys_msg.error_msg = msg;
    } else if (msg.message !== undefined) {
        sys_msg.error_msg = msg.message;
    } else if (typeof msg === 'object') {
        sys_msg.error_msg = JSON.stringify(msg);
    }

    let result = {
        request: req.url,
        error_code: sys_msg.error_code,
        error_msg: sys_msg.error_msg
    };
    req.error_msg = result;
    return res.status(code).json(result);
};