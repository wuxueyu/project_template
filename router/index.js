const common_router = require('./common_router')
const router = new common_router();

router.use('/user', require('./user/users.js'))

module.exports = router.done();