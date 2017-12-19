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

txzt();