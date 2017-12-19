var fetch = require('fetch');

console.log(fetch);
fetch.getFetch('http://localhost:1234/api/store/goodslist/1',function(data) {
    console.log(data)
});

$(function() {
    $('.grxx-wrap li').eq(0).css('color', '#55a83f');
   $('.grxx-wrap li').click(function() {
       $(this).css('color','#55a83f').siblings().css('color','#000')
   })
});

