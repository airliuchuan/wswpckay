webpackJsonp([11],{"./src/js/order.js":function(i,t){function n(){var i,t,n,s=0;return $.each($(".dd-list li"),function(c,l){i=$(l).children(".d-l-right").children("span").text().slice(1),t=$(l).children(".d-l-right").children("p").text().slice(1),n=i*t,s+=n,console.log(i,t,n)}),$(".dd-price").text("¥ "+s),s}function s(i){i.stopPropagation?i.stopPropagation():i.cancelBubble=!0}function c(i,t){if(i.files&&i.files[0]){var n=new FileReader;n.onload=function(i){t.attr("src",i.target.result)},n.readAsDataURL(i.files[0])}}$(function(){n(),$.each($(".up-input input"),function(i,t){var n=$(t).prev();$(t).change(function(){c(this,n)})}),$(".up-input input").change(function(){$(".up-input input").index(this);""!==$(this).val()&&$(this).parent().next()&&$(this).parent().next().show()}),$(".zhifu-list span:nth-child(2)").click(function(i){s(i),console.log(1),$(".pingzheng").show()}),$(".zhifu-list span:nth-child(1)").click(function(){$(".pingzheng").hide()}),$(".up-input").click(function(i){s(i)}),$(".zhifu-list span").eq(0).css("border-color","#55a83f"),$(".zhifu-list span").click(function(){$(this).css("border-color","#55a83f").siblings().css("border-color","#ddd")}),$(".dd-list-more").click(function(){50===$(".dd-a-list ul").height()?($(".dd-a-list ul").css("height","auto"),$(".dd-list-more span").text("收起地址")):($(".dd-a-list ul").css("height","50px"),$(".dd-list-more span").text("更多地址"))}),$(".dd-a-list ul li span:first-child").eq(0).css("border-color","#55a83f"),$(".dd-a-list ul li").click(function(){console.log($(this));var i=$(this).remove();$(".dd-a-list ul").prepend(i[0]),i.find("span:first-child").css("border-color","#55a83f"),i.siblings().find("span:first-child").css("border-color","#ddd"),$(".dd-a-list ul").css("height","50px"),$(".dd-list-more span").text("更多地址")})})}},["./src/js/order.js"]);