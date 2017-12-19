function radioStyle($this) {
    console.log(1)
    if($this.attr('type') === 'radio') {

        if($this[0].checked === true) {
            $this.next('img').attr('src', '../images/address/c_checkbox_on.png');
            $this.next('img').next('span').text('默认地址');


        } else if ($this[0].checked === false){
            $this.next('img').attr('src', '../images/address/c_checkbox_off.png');
            $this.next('img').next('span').text('设为默认');
        }
    }
}

$(function() {
    $('.address-radio input[type=radio]').click(function() {
        radioStyle( $(this) );
    });
    $('.address-radio input[type=radio]').change(function() {
        $.each($('.address-radio input[type=radio]'), function(index, item){
            radioStyle($(item));
        })
    });
    $('#cha').click(function() {
        $('.edit').hide();
    });
    $('.address-new-btn').click(function() {
        $('.edit').show();
    })
});