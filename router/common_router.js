const common = require('../common/')

class CommonRouter {

    constructor() {
        this.router = require('express').Router();
        this.router.use(common.requestTime);
        this.router.use(common.hook);
    }

    use(agv1, agv2) {

        this.router.use(agv1, agv2)
    }
    done() {

        this.router.use(common.params_validate)
        this.router.use(common.task_handler)
        return this.router;
    }



}

module.exports = CommonRouter