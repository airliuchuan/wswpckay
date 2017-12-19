var fetch = {};

(function(f) {

    // 将对象{}拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
   var obj2params = function (obj) {
        var result = '';
        var item;
        for (item in obj) {
            result += '&' + item + '=' + encodeURIComponent(obj[item]);
        }

        if (result) {
            result = result.slice(1);
        }

        return result;
    }

    f.getFetch = function(url,cb) {
        $.ajax({
            url: url,
            type:'get',
            dataType: 'json',
        })
            .done(function(data) {
                cb(data)
            })
            .fail(function(err) {
                console.log(err)
            })
    };

    f.postFetch = function(url, postData, cb) {
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: obj2params(postData),
        })
            .done(function(data) {
                cb(data);
            })
            .fail(function(data) {

            })
    }
})(fetch);

module.exports = fetch;