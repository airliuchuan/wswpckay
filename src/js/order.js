function total() {
    var dj,
        sl,
        yhq,
        zj,
        sum =0,
        heji;
    $.each($('.dd-list li'), function(index, item) {
        dj = $(item).children('.d-l-right').children('span').text().slice(1);
        sl = $(item).children('.d-l-right').children('p').text().slice(1);
        zj = dj * sl;
        sum += zj;
        console.log(dj,sl,zj)
    });
    // yhq = $('.use-yhq .fr').text().slice(2);

    // heji = sum - yhq;

    $('.dd-price').text('¥ ' + sum);//heji
    return sum;//heji
}
function stopPropagetion(e){
    if(e.stopPropagation) {
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

//读取预览
function readURL(input,img) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            img.attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


$(function() {

    total();

    //上传凭证
    $.each($('.up-input input'), function(index, item) {
        var pzImg = $(item).prev();

        $(item).change(function() {
            readURL(this,pzImg);
        });
    });
    $('.up-input input').change(function() {
        var pzIndex = $('.up-input input').index(this);
        if($(this).val() !== '' && $(this).parent().next()) {
            $(this).parent().next().show()
        }
    });
    //上传隐藏和显示
    $('.zhifu-list span:nth-child(2)').click(function(e){
        stopPropagetion(e);
        console.log(1)
         $('.pingzheng').show();
    });
    $('.zhifu-list span:nth-child(1)').click(function() {
        $('.pingzheng').hide();
    });
    $('.up-input').click(function(e) {
        stopPropagetion(e);
    });
    $('.zhifu-list span').eq(0).css('border-color', '#55a83f');
    $('.zhifu-list span').click(function() {
        $(this).css('border-color', '#55a83f').siblings().css('border-color','#ddd')
    });

    //地址列表的显示和隐藏
    $('.dd-list-more').click(function() {
        if($('.dd-a-list ul').height() === 50) {
            $('.dd-a-list ul').css('height', 'auto');
            $('.dd-list-more span').text('收起地址');
        } else {
            $('.dd-a-list ul').css('height', '50px');
            $('.dd-list-more span').text('更多地址');
        }
    });
    //选择某个地址
    $('.dd-a-list ul li span:first-child').eq(0).css('border-color','#55a83f');
    $('.dd-a-list ul li').click(function () {
        console.log($(this));
        var newLi = $(this).remove();
        $('.dd-a-list ul').prepend(newLi[0]);
        newLi.find('span:first-child').css('border-color', '#55a83f');
        newLi.siblings().find('span:first-child').css('border-color', '#ddd');
        $('.dd-a-list ul').css('height', '50px');
        $('.dd-list-more span').text('更多地址');
    })
});