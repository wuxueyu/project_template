/**
 * Created by yuanyuan on 16/10/11.
 */
const log4js = require('log4js');
const log_level = require('../baas_config.json').log_level;

log4js.configure({
    appenders: {
        "console": {
            type: "console"
        },
        "service": {
            type: "dateFile",
            filename: 'logs/service.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: 20480,
            backups: 3,
            category: 'service',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['service', 'console'], level: 'info' }

    }
});

exports.log4js = log4js;