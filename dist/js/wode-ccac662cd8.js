webpackJsonp([8],{"./src/js/wode.js":function(o,c){function t(o){o.stopPropagation?o.stopPropagation():o.cancelBubble=!0}$(".logout").click(function(o){t(o),alert("logout")}),function(){$.each($(".txzt"),function(o,c){"提现失败"==$(c).text()?$(c).css("background","red"):"待付款"==$(c).text()?$(c).css("background","#666"):$(c).css("background","#55a83f")})}()}},["./src/js/wode.js"]);