'use strict';
var error_code = {};
var name;

var define = {
    "SYSTEM_ERROR": {
        "error_code": 10001,
        "desc": "System error",
        "error_msg": "系统错误"
    },
    "SERVICE_UNAVALIABLE": {
        "error_code": 10002,
        "desc": "Service unavailable",
        "error_msg": "服务暂停"
    },
    "SERVICE_ERROR": {
        "error_code": 10003,
        "desc": "Remote service error",
        "error_msg": "远程服务错误"
    },
    "IP_LIMIT": {
        "error_code": 10004,
        "desc": "IP limit",
        "error_msg": "IP限制不能请求该资源"
    },
    "PARAM_ERROR": {
        "error_code": 10005,
        "desc": "(%s), see doc for more info",
        "error_msg": "（%s)，see doc for more info"
    },
    "ILLEGAL_REQUEST": {
        "error_code": 10006,
        "desc": "Illegal request",
        "error_msg": "非法请求"
    },
    "MISS_PARAMS": {
        "error_code": 10007,
        "desc": "Miss required parameter (%s) , see doc for more info",
        "error_msg": "缺失必选参数 (%s)，请参考API文档"
    },
    "ILLEGAL_PARAMS": {
        "error_code": 10008,
        "desc": "Parameter (%s)'s value invalid, expect (%s) , but get (%s) , see doc for more info",
        "error_msg": "(%s) 参数值非法，需为 (%s)，实际为 (%s)，请参考API文档 "
    },
    "OVER_LIMIT": {
        "error_code": 10009,
        "desc": "Request body length over limit",
        "error_msg": "请求长度超过限制"
    },
    "REQUEST_METHOD_POST": {
        "error_code": 10010,
        "desc": "Request must be post",
        "error_msg": "必须用Post方式请求"
    },
    "REQUEST_METHOD_NOT_EXIST": {
        "error_code": 10011,
        "desc": "Request method not exist",
        "error_msg": "请求API不存在"
    },
    "INVALID_USER": {
        "error_code": 10013,
        "desc": "invalid user",
        "error_msg": "不合法的用户"
    },
    "PARAM_IDS_NULL": {
        "error_code": 20010,
        "desc": "IDs parameter is null",
        "error_msg": "IDs 参数为空"
    },
    "PARAM_UID_NULL": {
        "error_code": 20011,
        "desc": "Uid parameter is null",
        "error_msg": "Uid 参数为空"
    },
    "USER_NOT_EXIST": {
        "error_code": 20012,
        "desc": "User does not exists",
        "error_msg": "用户不存在"
    },
    "TYPE_UNSUPPORT": {
        "error_code": 20013,
        "desc": "Unsupported image type, only suport JPG, GIF, PNG",
        "error_msg": "不支持的图片类型，仅仅支持JPG、GIF、PNG"
    },
    "OVER_SIZE": {
        "error_code": 20014,
        "desc": "Image size too large",
        "error_msg": "图片太大"
    },
    "CHECK_MULTIPART": {
        "error_code": 20015,
        "desc": "Does multipart has image",
        "error_msg": "请确保使用multpart上传图片"
    },
    "UNRULY_MANNER": {
        "error_code": 20016,
        "desc": "Your ip's behave in a comic boisterous or unruly manner",
        "error_msg": "此IP地址上的行为异常 "
    },
    "NEED_VERIFY": {
        "error_code": 20017,
        "desc": "Test and verify",
        "error_msg": "需要验证码"
    },
    "WRONG_VERIFIER": {
        "error_code": 20018,
        "desc": "Wrong verifier",
        "error_msg": "验证错误"
    },
    "AUTH_FAILED": {
        "error_code": 20019,
        "desc": "Auth failed",
        "error_msg": "认证失败"
    },
    "USERNAME_PWD_ERROR": {
        "error_code": 20020,
        "desc": "Username or password error",
        "error_msg": "用户名或密码不正确"
    },
    "NOT_EXIST": {
        "error_code": 20021,
        "desc": "%s is not exist",
        "error_msg": "不存在 %s"
    },
    "REQUEST_NOT_ALLOW": {
        "error_code": 20022,
        "desc": "The request is not allowed to",
        "error_msg": "请求不允许"
    },
    "PWD_NOT_SAME": {
        "error_code": 20023,
        "desc": "Password input not same",
        "error_msg": "两次输入的密码不一致"
    },
    "NO_RESULT": {
        "error_code": 20024,
        "desc": "No result found",
        "error_msg": "未找到结果"
    },
    "TIMEOUT": {
        "error_code": 20025,
        "desc": "Request timeout: %s",
        "error_msg": "请求超时：%s"
    },
    "REMOTE_REQUEST_FAILURE": {
        "error_code": 20026,
        "desc": "Remote request failure: %s",
        "error_msg": "远程请求失败：%s"
    },
    "CONDITION_NOT_PASS": {
        "error_code": 20027,
        "desc": "Condition not pass: %s",
        "error_msg": "条件校验不通过：%s"
    },
    "DEVICE_NOT_FIND": {
        "error_code": 20028,
        "desc": "Device not found",
        "error_msg": "用户未注册设备"
    },
    "USER_ALREADY_REGISTER": {
        "error_code": 20029,
        "desc": "user already register",
        "error_msg": "用户已注册"
    },
    "FILE_OVER_SIZE": {
        "error_code": 20030,
        "desc": "File size too large",
        "error_msg": "文件太大,请参考接口文档"
    },
    "INCR_MISS_PARAMS": {
        "error_code": 20032,
        "desc": "incr miss required parameter",
        "error_msg": "incr缺少必传参数"
    },
    "WRONG_GRAPHIC_CAPTCHA": {
        "error_code": 20033,
        "desc": "Wrong graphic verifier",
        "error_msg": "图形验证码错误"
    },
    "ACCOUNT_VALUE_ILLEGEL": {
        "error_code": 20034,
        "desc": "account value illegel",
        "error_msg": "账户值非法"
    },
    "USER_FREEZE": {
        "error_code": 20035,
        "desc": "user is freeze",
        "error_msg": "用户被冻结"
    },
    'EASEMOB_RETURN_ERROR': {
        'error_code': 20036,
        'desc': 'easemob return error',
        'error_msg': '环信返回错误'
    },
    'XML_PARSE_FAIL': {
        'error_code': 20037,
        'desc': 'xml parse fail',
        'error_msg': 'xml解析失败,请检查xml文件是否符合格式'
    },
    'USER_PHONE_HAS_REGISTERED': {
        'error_code': 20038,
        'desc': 'user phone has been registered',
        'error_msg': '手机号已注册'
    },
    'SMS_SEND_FAIL': {
        'error_code': 20039,
        'desc': 'sms send fail',
        'error_msg': '短信发送失败,%s'
    },
    'EXPRESS_ENQUIRY_ERROR': {
        'error_code': 20040,
        'desc': 'error enquiring about express information',
        'error_msg': '快递查询出错，%s'
    },
    'EMAIL_SEND_FAIL': {
        'error_code': 20041,
        'desc': 'email send fail',
        'error_msg': '邮件发送失败,%s'
    },
    'YZX_CONFIG_ERROR': {
        'error_code': 20042,
        'desc': 'yzx config error',
        'error_msg': '云之迅 %s 配置出错,请检查配置'
    },
    'YZX_SERVER_ERROR': {
        'error_code': 20043,
        'desc': 'yzx server error',
        'error_msg': '云之迅服务出错'
    },
    'DIVIDE_ERROR': {
        'error_code': 20044,
        'desc': 'can\'t divide by zero',
        'error_msg': '不能被零除'
    },
    'PARAMETER_ERROR': {
        'error_code': 20045,
        'desc': 'Parameter type error',
        'error_msg': '参数类型错误'
    },
    'DING_SYNC_FAIL': {
        'error_code': 20046,
        'desc': 'sync user list error',
        'error_msg': '同步钉钉用户列表失败,%s'
    },
    'ALIPAY_REFUND_ERROR': {
        "error_code": 20047,
        "desc": "alipay return error",
        "error_msg": "%s",
    },
    'CONFIG_ERROR': {
        "error_code": 20047,
        "desc": "config error",
        "error_msg": "%s 配置出错,请检查配置",
    }
};

for (name in define) {
    Object.defineProperty(error_code, name, {
        value: define[name],
        writable: false
    });
}

module.exports = error_code;