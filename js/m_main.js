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
	$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, reposition: false,closeButton:false, overlayClose: false, open:true, speed:0, fadeOut: 300, href:"#"+param, onComplete: function(){
		$("#cboxContent").css("background","none");
		$('#cboxWrapper').css('backgroundColor', "");
		$('#cboxLoadedContent').css('backgroundColor', "");
		$("#colorbox").width($("body").width());
		//$("body").height($("#"+param).height());
		$("#cboxWrapper").width($("body").width());
		$(".sec_main_img").hide();
	},
	onClosed: function(){
		//del_info();
		$("#cboxContent").css("background","#fff");
		$(".sec_main_img").show();
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
		$("#game2_circle").fadeIn(200,function(){
			$("#game2_circle").fadeOut(100,function(){
				$("#game2_div").fadeOut(100,function(){
					$("#game3_div").fadeIn(100);
				});
			});
		});
		$("#step_image").attr("src","images/step_2.png");
	}else if (param == "2"){
		$("#game3_circle").fadeIn(200,function(){
			$("#game3_circle").fadeOut(100,function(){
				$("#game3_div").fadeOut(100,function(){
					$("#game4_div").fadeIn(100);
				});
			});
		});
		$("#step_image").attr("src","images/step_3.png");
	}else if (param == "3"){
		$("#game4_circle").fadeIn(200,function(){
			$("#game4_circle").fadeOut(100,function(){
				$("#game5_div").show();
				$("#game6_div").show();
				clearInterval(counter);
				$( 'html, body' ).animate({ scrollTop: $("#game4_div").height() + $("#step_div").height()+ $("#sec_div").height()+ $("#bar_div").height()+ $(".close").height()},500,function(){
					//var device_height	= $(window).height();

					//if (device_height > $("#game5_div").height())
					//{
						//var ex_height	= (device_height - $("#game5_div").height())/2;
						//$("#game5_div").css("margin-top",ex_height+"px");
						//$("#game5_div").css("margin-bottom",ex_height+"px");
					//}
					//$("#game4_div").hide();
					//$("#step_div").hide();
					//$("#sec_div").hide();
					//$("#bar_div").hide();
					//$(".close").hide();
					//$("body").css("overflow","hidden");
					$('body').bind('touchmove', function(e){e.preventDefault()});
				});
			});
		});

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
	var mb_phone		= $("#mb_phone").val();
	var mb_addr		= $("#mb_addr").val();
	var mb_shop		= $("#mb_shop").val();

	if (mb_name == "")
	{
		alert('이름을 입력해 주세요.');
		$("#mb_name").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_phone == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#mb_phone").focus();
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

	if (chk_mb_flag == 0)
	{
		alert("개인정보 취급 동의/광고동의를 안 하셨습니다");
		//chk_ins = 0;
		return false;
	}
/*
	if ($('#mb_agree').is(":checked") == false)
	{
		alert("약관에 동의를 안 하셨습니다");
		return false;
	}
*/
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
			if (response == "Y")
			{
				$("#game6_div").show();
				var move_height	= $("#game4_div").height() + $("#game5_div").height()+ $("#step_div").height()+ $("#sec_div").height()+ $("#bar_div").height()+ $(".close").height();
				$( 'html, body' ).animate({ scrollTop: "2200"},1500,function(){
					//$("#game5_div").hide();
					//$("body").css("overflow","auto");
				});
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

function chk_len3(val)
{
	if (val.length == 11)
	{
		$("#mb_phone").blur();
	}
}

// gnb
$(document).on("click", ".gnbBtn", function(){
	$("html").addClass("gnbOpen");
	$(".sec_top").hide();
	$(".sec_main_img").hide();
});
$(document).on("click", "#m_menu_close", function(){
	$("html").removeClass("gnbOpen");
	$(".sec_top").show();
	$(".sec_main_img").show();
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

function mb_check()
{
	if (chk_mb_flag == 0)
	{
		$("#mb_agree").attr("src","images/checked.png");
		chk_mb_flag = 1;
	}else{
		$("#mb_agree").attr("src","images/check.png");
		chk_mb_flag = 0;
	}
}

function sns_share(media, flag)
{
	if (media == "fb")
	{

		var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('http://www.belif-factory.com/MOBILE/index.php'),'sharer','toolbar=0,status=0,width=600,height=325');
		$.ajax({
			type   : "POST",
			async  : false,
			url    : "../main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
		//var newWindow = window.open('https://www.facebook.com/dialog/feed?app_id=1604312303162602&display=popup&caption=testurl&link=http://vacance.babience-event.com&redirect_uri=http://www.hanatour.com','sharer','toolbar=0,status=0,width=600,height=325');
	}else if (media == "tw"){
		var newWindow = window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent("빌리의 수분 폭탄 공장에 숨어 있는 빌리를 찾아주신 분에게는 즉석 당첨을 통해 수분 폭탄 쿠션 미니어처를 드립니다. ") + '&url='+ encodeURIComponent('http://bit.ly/1QuvGJU'),'sharer','toolbar=0,status=0,width=600,height=325');
		$.ajax({
			type   : "POST",
			async  : false,
			url    : "../main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
	}else if (media == "kt"){
		// 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
		//Kakao.Link.createTalkLinkButton({
		Kakao.Link.sendTalkLink({
		  //container: '#kakao-link-btn',
		  label: "빌리를 찾으면 수분 폭탄 쿠션이 내게로",
		  image: {
			src: 'http://www.belif-factory.com/MOBILE/images/belif_billy_share.jpg',
			width: '1200',
			height: '630'
		  },
		  webButton: {
			text: '빌리의 수분 폭탄 공장',
			url: 'http://www.belif-factory.com/?media=kt' // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
		  }
		});
		$.ajax({
			type   : "POST",
			async  : false,
			url    : "../main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
	}else{
		Kakao.Story.share({
			url: 'http://www.belif-factory.com/MOBILE/index.php?media=ks',
			text: '[빌리프] 빌리의 수분 폭탄 공장\r\n\r\n빌리의 수분 폭탄 공장에 숨어 있는 빌리를 찾아주신분에게는 즉석당첨을 통해 수분 폭탄 쿠션 미니어처를 드립니다.'
		});
		$.ajax({
			type   : "POST",
			async  : false,
			url    : "../main_exec.php",
			data:{
				"exec" : "insert_share_info",
				"sns_media" : media,
				"sns_flag"		: flag
			}
		});
	}
}

function use_coupon(param)
{
	if (confirm("쿠폰을 사용하시겠습니까?"))
	{
		$.ajax({
			type:"POST",
			data:{
				"exec"				: "use_coupon",
				"mb_phone"		: param
			},
			url: "../main_exec.php",
			success: function(response){
				if (response == "Y")
				{
					alert('쿠폰이 사용처리되었습니다. 감사합니다.');
					location.reload();
				}else{
					alert('사용자가 많아 처리가 지연되고 있습니다. 잠시후 다시 시도해 주세요.');
				}
			}
		});
	}

}