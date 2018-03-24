const log = require('../models/log4js');

const logger = log.log4js.getLogger('service')
module.exports = function(req, res, next) {
    let startTime = new Date();
    req.startTime = startTime;
    let endTimeCallBack = function() {
        let endTime = new Date();
        let delta = endTime - startTime;
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (typeof ip === 'string' && ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        if (req.error_msg) {

            let print_res = JSON.stringify({ "ip": ip, "url": req.url, "param": req.body, "result": req.error_msg, "time": `${delta}ms` });

            logger.error(print_res)
        } else if (req.res_result) {

            let print_res = JSON.stringify({ "ip": ip, "url": req.url, "param": req.body, "result": req.res_result, "time": `${delta}ms` });
            logger.info(print_res)

        }
    }
    res.once('finish', endTimeCallBack);
    res.once('close', endTimeCallBack);
    next();
}