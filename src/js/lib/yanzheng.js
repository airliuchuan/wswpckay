var yz = {};

(function(obj) {

    obj.unEmpty = function(input) {
        var n = 0;
        $.each(input, function(index, item) {
            if($(item).val().trim()) {
                n ++;
            }
        });

        if(n === input.length) {
            return true;//有内容返回true;
        } else {
            return false;
        }
    };
    obj.checkReg = function(input, reg) {
        var inputVal = input.val().trim();
        if(!reg.test(inputVal) && !inputVal == '') {
            return false
        } else {
            return true;
        }
    }
})(yz);

module.exports = yz;