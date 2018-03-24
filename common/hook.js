module.exports = function(req, res, next) {
    req.mgrHook = {};
    req.mgrHook.validate = function(schema) {
        req.mgrHook.paramsSchema = schema;
    }

    req.mgrHook.set = (task, callBack) => {

        req.mgrHook.task = task;
        req.mgrHook.callBack = callBack;
    }

    next();
}