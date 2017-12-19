var swiper = require('swiper');

var sySwiper = new swiper('.sy-banner .swiper-container', {
    autoplay: 2000,
    loop: true,
    paginationClickable: true,
    pagination: '.sy-banner .swiper-pagination'
});
//tabbar
$('li', '.sy-tabbar').eq(0).css('border-bottom', '1px solid #55a83f');
$('li', '.sy-tabbar').click(function() {
    $(this).css('border-bottom', '1px solid #55a83f').siblings().css('border', '1px solid transparent');
});