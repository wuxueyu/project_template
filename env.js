'use strict';
const lodash = require('lodash');

const baas_config = require('./baas_config.json');

const { development, production } = baas_config.env;
const { analysis_config } = baas_config;

module.exports = function() {
    switch (process.env.ENV) {
        case 'production':
            console.log('production');
            return lodash.merge({
                port: production.port,
                mongo_uri: production.mongo_uri,
                database: production.database,
                welcome: production.welcome,
                extend_path: production.extend_path,
                mongo_is_replica: production.mongo_is_replica
            }, analysis_config);

        default:
            // default is dev env, to keep production env untouched
            console.log('development (default)');
            return lodash.merge({
                port: baas_config.env.default.port,
                mongo_uri: baas_config.env.default.mongo_uri,
                database: baas_config.env.default.database,
                welcome: baas_config.env.default.welcome,
                extend_path: baas_config.env.default.extend_path,
                mongo_is_replica: baas_config.env.default.mongo_is_replica

            }, analysis_config);
    }
};