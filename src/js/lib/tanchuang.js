//弹窗脚本,api: ctShow()弹窗出现 ctEnter()确认按钮的回调 ctCancel()取消按钮的回调
var tc = {};
(function(obj){
        //弹窗出现
        obj.ctShow = function(obj) {
            var option = {
                con: obj.con || ' ',
                enter: obj.enter || false,
                cancel: obj.cancel || false,
                center: obj.center || 'left'

            };
            if(option.enter) {
                $('.t-c-cancel').hide();
                $('.t-c-enter').css('width', '100%')
            }
            $('.t-c-con').css('text-align', option.center);
            $('.t-c-con p').text(option.con);
            $('.tanchuang-wrap').show(200);
        };
        //弹窗确定按钮回调
        obj.ctEnter = function (callback) {
            $('.t-c-enter').click(function() {
                if(callback) {
                    callback();
                    $('.tanchuang-wrap').hide(200);
                } else {
                    $('.tanchuang-wrap').hide(200);
                }

            });
        };
        //弹窗取消按钮回调
        obj.ctCancel = function (callback) {
            $('.t-c-cancel').click(function() {
                if(callback) {
                    callback();
                    $('.tanchuang-wrap').hide(200);
                    return false;
                } else {
                    $('.tanchuang-wrap').hide(200);
                    return false;
                }
            })
        };
})(tc);

module.exports = tc;




