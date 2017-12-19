function selectCate($this) {
    $this.css('border-color', '#e3473b').siblings().css('border-color', 'transparent');
}
$(function() {
   $('.order-cate li').click(function() {
       selectCate($(this))
   });
});