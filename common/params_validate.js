const Joi = require('joi')
const log = require('../models/log4js');
const logger = log.log4js.getLogger('service');
const Code = require('../lib/error_code')
module.exports = function(req, res, next) {

    logger.log("schema 执行开始中");
    if (req.mgrHook && req.mgrHook.paramsSchema) {

        let params = Object.assign({}, req.query, req.body);
        Joi.validate(params, req.mgrHook.paramsSchema, {
            allowUnknown: true,
        }, (err, value) => {
            if (err) {
                return errorRequest(req, res, Code.PARAM_ERROR, err.details.length > 0 ? err.details[0].message : '参数错误')
            } else {
                next();
            }
        });
    } else {
        next();
    }

}