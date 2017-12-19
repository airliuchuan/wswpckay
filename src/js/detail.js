
var tc = require('tanchuang');



//弹窗
// function detailFloat($btn) {
//
//     if($btn.text() === $('#jr-btn').text()) {
//         $('.f-gm-btn').hide();
//         $('.f-gwc-btn').show();
//     } else {
//         $('.f-gwc-btn').hide();
//         $('.f-gm-btn').show();
//     }
//     $('.detail-float').show();
// }
//计算钱数
// function totalD(){
//     var n = $('.float-count .number').text() *1;
//     var s = $('.f-good-msg .price').text();
//     s = (s.split(' ')[1] * n).toFixed(2);
//
//     return s;
// }

$(function() {
    //底部浮窗
    // $('#jr-btn').click(function(){
    //     console.log('jr-btn');
    //     detailFloat($(this));
    // });
    // $('#gm-btn').click(function() {
    //     console.log('gm-btn');
    //     detailFloat($(this));
    // });
    // $('.float-good .close').click(function(){
    //     $('.detail-float').hide();
    // });
    //加减数量
    $('.add').click(function(){
        if($(this).next('.number').val()>100){
            $(this).next('.number').val(100);
            $('.alert').show().html('超出库存了！');
            setTimeout(function(){$('.alert').hide();},2000);
            return false;
        }else
            $(this).prev('.number').val(parseInt($(this).prev('.number').val())+1);
        //计算总钱数
        // totalD();
    });

    //点击减一
    $('.minus').click(function(){
        if($(this).next('.number').val()==0)
            $(this).next('.number').val(0);
        else
            $(this).next('.number').val(parseInt($(this).next('.number').val())-1);
        //计算总钱数
        // totalD();

    });
    // $('.float-btn button').click(function() {
    //     alert(totalD());
    //     $('.detail-float').hide();
    // })
    //选择规格
    $('.size-list li').eq(0).css({color: '#e64240', borderColor: '#e64240'});
    $('.size-list li').click(function() {
        $(this).css({color: '#e64240',borderColor: '#e64240'}).siblings().css({color: '#333', borderColor: '#999'})
    });

    //客服
    $('.kf-btn').click(function() {
        tc.ctShow({con: '客服电话: 400-888-888',enter: true, center: 'center'});
        tc.ctEnter();
    });
    //手动输入数量
    $(".float-count .number").click(function(){
        $('.text1').css({"display":"flex","-webkit-display":"flex"}).attr({'ind':$(this).parents('li').index(),"ind_1":$(this).parents("ul").attr("ind")});
        $('.text1 input[type=number]').val($(this).html());
    })
    $('.text1 input[type="button"]').click(function(){
        if($('.text1 input[type=number]').val()==""){
            $('.alert').show().html('请输入数量！');
            setTimeout(function(){$('.alert').hide();},2000);
            return false;
        }
        if ($('.text1 input[type=number]').val()>100) {
            $('.alert').show().html('超出库存了！');
            setTimeout(function(){$('.alert').hide();},2000);
            return false;
        }
        console.log($('.text1 input[type=number]').val())
        $(".float-count .number").text($('.text1 input[type=number]').val());
        $('.text1').css({"display":"none","-webkit-display":"none"});
    })

});
