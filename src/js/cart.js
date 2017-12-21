var devUrl = '../images';
var Url = '/img/front';
//计算总钱数
function total(){
	setTimeout(function(){
		var S=0;
	    $.each($('.total'), function() {
	    	var $ul_total=$(this).prev('ul').find("input[type='checkbox']");
	    	var s=0;
	        var n1=0;
	    	$.each($(this).prev('ul').find(".number"), function(i) {
		if($ul_total.eq(i).attr("checked")=="checked"){
			s=s+parseInt($(this).val())*parseInt($(this).parent().prev().html().replace("￥",""));
			n1=n1+parseInt($(this).html());
		}
	});
	$(this).children("span").html("￥"+s.toFixed(1));
	$(this).children("number").val(n1);
	S=S+s;
	    });
	$(".bottom span").html(S.toFixed(2));
	},100)
}
//判断有无数据
function hide(){
	if ($(".content").length==0) {
		$(".bottom").hide();
		$(".no").css("display","block");
		return;
	}else{
		$(".bottom").eq(0).show();
		$(".no").css("display","none");
	}
}
//判断是否全选
function sum(){

	if ($("ul input[checked='checked']").length==$(".content li").length) {
		$(".bottom input[type=checkbox]").attr("checked","checked");
		$(".bottom input[type=checkbox]").next("img").attr("src",Url + "/gwc/c_checkbox_on.png");
	}else{
		$(".bottom input[type=checkbox]").removeAttr("checked");
		$(".bottom input[type=checkbox]").next("img").attr("src",Url + "/gwc/c_checkbox_off.png");

	}
}

//判断是否有商品被选中
function ifSelected() {
	console.log($(".content ul input[checked='checked']").length);
	if($(".content ul input[checked='checked']").length) {
        $('.bottom .sett').css('background', '#e64240').removeAttr('disabled');
    }else {
        $('.bottom .sett').css('background','#ccc');
        $('.bottom .sett')[0].disabled = 'disabled';
    }
}

//给单选框或复选框添加样式
function checkbox($this){
	if($this.attr('type')=="checkbox"){
	   if ($this.attr('checked')=="checked") {
		$this.removeAttr("checked");
		 $this.next('img').attr("src",Url + "/gwc/c_checkbox_off.png");
	   }else{
		 $this.attr("checked","checked");
		$this.next('img').attr("src",Url + "/gwc/c_checkbox_on.png");
	   }
	}
	//计算总钱数
	total();
}

//删除商品
function delGwc($this) {
    $this.parent().remove();
    hide();
    total();
}
var tc = require('tanchuang');

$(function(){
	hide();
	total();
//编辑
$(".fr", '.gwc-header').click(function(){
       if ($(this).html()=="编辑") {
       	$(this).html("完成");
       	$(".bottom").eq(1).show();
       }else{
       	$(this).html("编辑");
       	$(".bottom").eq(1).hide();
       }
       hide();   
});

//底部全选
$('.bottom-label input').change(function(){
		if ($(this).attr("checked")=="checked") {
			$(".con input[type='checkbox']").removeAttr("checked");
			$(".con input[type='checkbox']").next('img').attr("src",Url + "/gwc/c_checkbox_off.png");
		}else{
			$(".con input[type='checkbox']").attr("checked","checked");
			$(".con input[type='checkbox']").next('img').attr("src",Url + "/gwc/c_checkbox_on.png");
		}
    ifSelected();
		checkbox($(this));
})

//子项全选
// $('.list input').change(function(){
// 	var $list_input=$(this).parents('.list').next('ul').find('input[type=checkbox]');
// 		if ($(this).attr("checked")==undefined) {
// 			$list_input.attr("checked","checked");
// 			$list_input.next('img').attr("src","../images/gwc/c_checkbox_on.png");
// 		}else{
// 			$list_input.removeAttr("checked");
// 			$list_input.next('img').attr("src","../images/gwc/c_checkbox_off.png");
// 		}
// 		checkbox($(this));
// 		sum();
// })

$("ul input[type='checkbox']").change(function(){
	checkbox($(this));
	// var $ul_input=$(this).parents('ul').prev('.list').find('input');
	// if($(this).parents('ul').find("input[checked='checked']").length==$(this).parents("ul").children('li').length){
	// 	$ul_input.attr("checked","checked");
	// 	$ul_input.next('img').attr("src","../images/gwc/c_checkbox_on.png");
	// }else{
	// 	$ul_input.removeAttr("checked");
	// 	$ul_input.next('img').attr("src","../images/gwc/c_checkbox_off.png");
	// }
    ifSelected();
	sum();
})

//点击加一
		$('.btn2').click(function(){
			if($(this).next('.number').val()>100){
				$(this).next('.number').val(100);
				$('.alert').show().html('超出库存了！');
				 setTimeout(function(){$('.alert').hide();},2000);
				return false;
			}else
			$(this).prev('.number').val(parseInt($(this).prev('.number').val())+1);
			//计算总钱数
			total();
		})

		//点击减一
		$('.btn1').click(function(){
			if($(this).next('.number').val()==0)
				$(this).next('.number').val(0);
			else
				$(this).next('.number').val(parseInt($(this).next('.number').val())-1);
				/*计算总钱数*/
				total();
				/*计算总钱数*/
		})


//删除

if(!$('.content li').length) {
	$('.no').show();
} else {
    $('.no').hide();
}

$('.del-gwc').click(function() {
	var that = $(this);
	console.log($(this))
    tc.ctShow({con:'确定要删除所选商品吗?',center: 'center'});
    tc.ctEnter(function(){
        delGwc(that);
        if(!$('.content li').length) {
            $('.no').show();
        }
	});
    tc.ctCancel();
})

});
