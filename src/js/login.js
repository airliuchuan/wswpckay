var yz = require('yanzheng')
$('.login input').focus(function() {
    $(this).parent().addClass('login-input-selected');
});
$('.login input').blur(function() {
    $(this).parent().removeClass('login-input-selected');
});
$('#logon').submit(function() {
    if(!yz.unEmpty($('.input-item input'))) {
        $.each($('.input-item input'), function(k,v) {
            if(!$(v).val().trim()) {
                $(v).parent().css('border-color', '#e3473b');
                $(v).next('span').css('display','block').text( $(v).prev().text().substr(0,$(v).prev().text().lastIndexOf(':')) + '不能为空');
            }
        });
        return false;
    }
});

$('.input-item input').blur(function() {
   if($(this).val()) {
       $(this).parent().css('border-color', '#ddd');
       $(this).next('span').css('display','none');
   }
});