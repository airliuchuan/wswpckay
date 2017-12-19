var checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,//邮箱验证
    checkPhone = /^((13[0-9])|(17[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\d{8}$/,//手机验证
    checkId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证验证
    checkNum = /^([0-9]|[0-9]{2}|100)$/,//年龄验证
    checkNick = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;//验证昵称(数字字母下划线)

module.exports = {
    checkEmail: checkEmail,
    checkId: checkId,
    checkNum: checkNum,
    checkPhone: checkPhone,
    checkNick: checkNick
};