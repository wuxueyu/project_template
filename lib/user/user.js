const UserModle = require('../../models/user')
const Code = require('../../lib/error_code')
const user_router = {};

user_router.new = async(params) => {

    try {
        let { user_name, phone, password } = params;
        let user = new UserModle({ "user_name": user_name, "phone": phone, "password": password })
        let doc = await UserModle.findOne({ "phone": phone })
        if (doc) {
            throw Code.USER_PHONE_HAS_REGISTERED
        }
        return await user.save();
    } catch (e) {
        throw e;
    }
}

module.exports = user_router;