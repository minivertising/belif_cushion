$(".mask").click(function(){
	$('#mobile_menu').animate({right:-200},300,'linear',function(){
		$("#mobile_menu").hide();
		$(".mask").fadeOut(300);
		$(window).off(".disableScroll");
	});
});

function show_menu()
{
	if ($("#mobile_menu").css("display") == "block")
	{
		$('#mobile_menu').animate({right:-200},300,'linear',function(){
			$("#mobile_menu").hide();
			$(".mask").fadeOut(300);
			$(window).off(".disableScroll");
		});
	}else{
		$(".mask").width($(window).width());
		$(".mask").height($(window).height());
		$(".mask").fadeTo(1000, 0.8);

		$('#mobile_menu').css('right','-200px');
		// 이동위치값 지정
		var position = 0;
		$('#mobile_menu').show().animate({right:position},300,'linear');

		$(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
			e.preventDefault();
			return;
		});
	}
}

function open_pop(param)
{
	$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#"+param, onComplete: function(){
		$("#cboxContent").css("background","none");
		$('#cboxWrapper').css('backgroundColor', "");
		$('#cboxLoadedContent').css('backgroundColor', "");
		$("#colorbox").width($("body").width());
		$("#cboxWrapper").width($("body").width());
	},
	onClosed: function(){
		//del_info();
		$("#cboxContent").css("background","#fff");
	}});
}

var count = 26;
var gage_per	= 0;
var gage_num	= 0;

function start_game()
{
	$("#game1_div").hide();
	$("#game2_div").show();
	$("#game_timer").show();

	time_control();
}

var counter = null;

function time_control()
{
	counter = setInterval(timer, 1000); //10 will  run it every 100th of a second

	function timer()
	{
		if (count <= 0)
		{
			clearInterval(counter);
			open_pop("timeover_popup");
			return;
		}
		count--;
		gage_num++;
		gage_per	= (gage_num / 26)*100;
		$(".time").html(count+"<span>초</span>");
		$(".blue").css("width",gage_per+"%");
	}
}

function right_answer(param)
{
	if (param == "1")
	{
		$("#game2_div").fadeOut(100,function(){
			$("#game3_div").fadeIn(100);
		});
		$("#step_image").attr("src","images/step_2.png");
	}else if (param == "2"){
		$("#game3_div").hide();
		$("#game4_div").show();
		$("#step_image").attr("src","images/step_3.png");
	}else if (param == "3"){
		$("#game4_div").hide();
		$("#game5_div").show();
		$("#game_timer").hide();
		clearInterval(counter);
	}
}

function change_addr(param)
{
	$.ajax({
		type:"POST",
		data:{
			"addr_idx"		: param.value
		},
		url: "../MOBILE/ajax_addr.php",
		success: function(response){
			$("#mb_shop").html(response);
		}
	});
}

function ins_info()
{
	var mb_name		= $("#mb_name").val();
	var mb_phone1		= $("#mb_phone1").val();
	var mb_phone2		= $("#mb_phone2").val();
	var mb_phone3		= $("#mb_phone3").val();
	var mb_addr		= $("#mb_addr").val();
	var mb_shop		= $("#mb_shop").val();
	var mb_phone		= mb_phone1 + mb_phone2 + mb_phone3;

	if (mb_name == "")
	{
		alert('이름을 입력해 주세요.');
		$("#mb_name").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_phone2 == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#mb_phone2").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_phone3 == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#mb_phone3").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_addr == "")
	{
		alert('매장을 선택해 주세요.');
		$("#mb_addr").focus();
		//chk_ins = 0;
		return false;
	}

/*
	if (chk_mb_flag == 0)
	{
		alert("개인정보 취급 동의/광고동의를 안 하셨습니다");
		//chk_ins = 0;
		return false;
	}
*/

	if ($('#mb_agree').is(":checked") == false)
	{
		alert("약관에 동의를 안 하셨습니다");
		return false;
	}

	$.ajax({
		type:"POST",
		data:{
			"exec"				: "insert_info",
			"mb_name"		: mb_name,
			"mb_phone"		: mb_phone,
			"mb_shop"		: mb_shop,
		},
		url: "../main_exec.php",
		success: function(response){
			alert(response);
			if (response == "Y")
			{
				open_pop("complete_popup");
			}else{
				open_pop("duplicate_popup");
			}
		}
	});
}

function only_num(obj)
{
	var inText = obj.value;
	var outText = "";
	var flag = true;
	var ret;
	for(var i = 0; i < inText.length; i++)
	{
		ret = inText.charCodeAt(i);
		if((ret < 48) || (ret > 57))
		{
			flag = false;
		}
		else
		{
			outText += inText.charAt(i);
		}
	}
 
	if(flag == false)
	{
		alert("전화번호는 숫자입력만 가능합니다.");
		obj.value = outText;
		obj.focus();
		return false;
	} 
	return true;
}

function chk_len(val)
{
	if (val.length == 4)
	{
		$("#mb_phone3").focus();
	}
}

function chk_len2(val)
{
	if (val.length == 4)
	{
		$("#mb_phone3").blur();
	}
}

// gnb
$(document).on("click", ".gnbBtn", function(){
	$("html").addClass("gnbOpen");
	$(".sec_top").hide();
});
$(document).on("click", "#m_menu_close", function(){
	$("html").removeClass("gnbOpen");
	$(".sec_top").show();
});

$(document).on("click", "#m_event_show", function(){
	$("html").removeClass("gnbOpen");
	$(".sec_top").show();
});

function move_page(param)
{
	if (param == "product")
	{
		var product_area	= $(document).height() * 0.4;

		$("html").removeClass("gnbOpen");
		$(".sec_top").show();
		$( 'html, body' ).animate({ scrollTop: product_area},500);
	}
}