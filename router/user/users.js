const router = require('express').Router({ mergeParams: true })
const Joi = require('joi')
const common = require('../../common')
const log = require('../../models/log4js.js')
const logger = log.log4js.getLogger('service');
const user = require('../../lib/user/user')

router.post('/new.json', (req, res, next) => {

    let schema = Joi.object().keys({
        user_name: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
    });

    req.mgrHook.validate(schema);
    req.mgrHook.set(user.new(req.body));
    next();
})

module.exports = router