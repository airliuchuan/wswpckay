webpackJsonp([15],{"./src/js/address.js":function(e,n){function t(e){console.log(1),"radio"===e.attr("type")&&(!0===e[0].checked?(e.next("img").attr("src","../images/address/c_checkbox_on.png"),e.next("img").next("span").text("默认地址")):!1===e[0].checked&&(e.next("img").attr("src","../images/address/c_checkbox_off.png"),e.next("img").next("span").text("设为默认")))}$(function(){$(".address-radio input[type=radio]").click(function(){t($(this))}),$(".address-radio input[type=radio]").change(function(){$.each($(".address-radio input[type=radio]"),function(e,n){t($(n))})}),$("#cha").click(function(){$(".edit").hide()}),$(".address-new-btn").click(function(){$(".edit").show()})})}},["./src/js/address.js"]);