var tc = require('tanchuang');
var yz =  require('yanzheng');
var reg = require('reg');

var wdInput = $('.grxx-wrap input');

$('.bc-btn').click(function() {
    if(!yz.unEmpty($('.grxx-wrap input'))) {
        tc.ctShow({con: '填写的信息不能为空', enter: true, center: 'center'});
        tc.ctEnter();
    } else if(!yz.checkReg($('#phone'), reg.checkPhone)) {
        tc.ctShow({con: '请输入正确的手机号码', enter: true, center: 'center'});
        tc.ctEnter();
    } else if(!yz.checkReg($('#email'), reg.checkEmail)) {
        tc.ctShow({con: '请输入正确的邮箱格式', enter: true, center: 'center'});
        tc.ctEnter();
    } else if(!yz.checkReg($('#id'), reg.checkId)) {
        tc.ctShow({con: '请输入正确的身份证格式', enter: true, center: 'center'});
        tc.ctEnter();
    } else {
        tc.ctShow({con: 'succ',enter: true, center: 'center'});
        tc.ctEnter()
    }
});
$('.grxx-wrap li').click(function() {
    //将input焦点弄到文字后边的方法, 复制原内容, 并在调用focus()前清空input的值,之后添加原内容
    var yuanVal = $(this).children('input').val();
    $(this).children('input').val('').focus().val(yuanVal);
});
$('#phone').blur(function() {
    if(!yz.checkReg($(this), reg.checkPhone)) {
        tc.ctShow({con: '请输入正确的手机号码', enter: true, center: 'center'});
        tc.ctEnter();
    }
});
$('#email').blur(function() {
    if(!yz.checkReg($(this), reg.checkEmail)) {
        tc.ctShow({con: '请输入正确的邮箱格式', enter: true, center: 'center'});
        tc.ctEnter();
    }
});
$('#id').blur(function() {
    if(!yz.checkReg($(this), reg.checkId)) {
        tc.ctShow({con: '请输入正确的身份证格式', enter: true, center: 'center'});
        tc.ctEnter();
    }
});