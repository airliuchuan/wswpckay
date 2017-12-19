//组织冒泡
function stopPropagetion(e){
    if(e.stopPropagation) {
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}
function txzt() {
    $.each($('.txzt'),function(index, item) {
        if($(item).text() == '提现失败') {
            $(item).css('background','red')
        } else if($(item).text() == '待付款'){
            $(item).css('background','#666')
        } else {
            $(item).css('background','#55a83f')
        }
    })

}
//
$('.logout').click(function(e) {
    stopPropagetion(e);
    alert('logout');
});
txzt();