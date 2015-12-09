function change_tab(param)
{
	if (param == "1")
	{
		$(".change_tab").hide();
		$("#benefit_contents").show();
		$("#tab_image1").attr("src","images/gnb_navi_1_on.png");
		$("#tab_image2").attr("src","images/gnb_navi_2_off.png");
		$("#tab_image3").attr("src","images/gnb_navi_3_off.png");
		$("#tab_image4").attr("src","images/gnb_navi_4_off.png");
		$("#mygift_contents").hide();
		$("#mygift_contents2").hide();
		$("#mygift_contents3").hide();
		$("#mygift_contents4").hide();
	}else if (param == "2"){
		$(".change_tab").hide();
		$("#nominee_contents").show();
		$("#nominee_contents2").show();
		$("#nominee_contents3").show();
		$("#nominee_contents4").show();
		$("#tab_image1").attr("src","images/gnb_navi_1_off.png");
		$("#tab_image2").attr("src","images/gnb_navi_2_on.png");
		$("#tab_image3").attr("src","images/gnb_navi_3_off.png");
		$("#tab_image4").attr("src","images/gnb_navi_4_off.png");
		$("#mygift_contents").hide();
		$("#mygift_contents2").hide();
		$("#mygift_contents3").hide();
		$("#mygift_contents4").hide();
	}else if (param == "3"){
		$(".change_tab").hide();
		$("#vote_contents").show();
		$("#vote_contents2").show();
		$("#vote_contents3").show();
		$("#vote_contents4").show();
		$("#vote_contents5").show();
		$("#vote_contents6").show();
		$("#tab_image1").attr("src","images/gnb_navi_1_off.png");
		$("#tab_image2").attr("src","images/gnb_navi_2_off.png");
		$("#tab_image3").attr("src","images/gnb_navi_3_on.png");
		$("#tab_image4").attr("src","images/gnb_navi_4_off.png");
		$("#mygift_contents").hide();
		$("#mygift_contents2").hide();
		$("#mygift_contents3").hide();
		$("#mygift_contents4").hide();
		$.ajax({
			type:"POST",
			data:{
				"pg"		: "1",
				"vote_param": "all"
			},
			url: "./ajax_list.php",
			success: function(response){
				$("#ajax_change").html(response);
			}
		});
	}else if (param == "4"){
		$(".change_tab").hide();
		$("#mygift_contents").show();
		$("#mygift_contents2").show();
		$("#mygift_contents3").show();
		//$("#mygift_contents4").show();
		//$("#mygift_contents5").show();
		$("#tab_image1").attr("src","images/gnb_navi_1_off.png");
		$("#tab_image2").attr("src","images/gnb_navi_2_off.png");
		$("#tab_image3").attr("src","images/gnb_navi_3_off.png");
		$("#tab_image4").attr("src","images/gnb_navi_4_on.png");
	}
}


function reg_nominee(param)
{
	if (param == "1")
	{
		sel_nominee	= "1";
	}else if (param == "2"){
		sel_nominee	= "2";
	}else if (param == "3"){
		sel_nominee	= "3";
	}else if (param == "4"){
		sel_nominee	= "4";
	}else if (param == "5"){
		sel_nominee	= "5";
	}
	$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#reg_input_popup", onComplete: function(){
		$("#cboxContent").css("background","none");
		$("#colorbox").width($("body").width());
		$("#cboxWrapper").width($("body").width());
	},
	onLoad:function() {
		//$('html, body').css('overflow', 'hidden'); // page scrollbars off
	}, 
	onComplete: function(){
		var bg = "#f3f0f0";
		$('#cboxWrapper').css('backgroundColor', bg);
		$('#cboxLoadedContent').css('backgroundColor', bg);
	},
	onClosed: function(){
		del_info();
		$("#cboxContent").css("background","#fff");
		$('html, body').css('overflow', ''); // page scrollbars off
	}});

}

function reg_nominee2(param)
{
	location.href="./popup_input.php?sel_nominee="+param;
}

function ins_info2()
{
	var mb_name		= $("#mb_name").val();
	var mb_phone1		= $("#mb_phone1").val();
	var mb_phone2		= $("#mb_phone2").val();
	var mb_phone3		= $("#mb_phone3").val();
	var mb_phone		= mb_phone1 + mb_phone2 + mb_phone3;
	sel_nominee			= $("#sel_nominee").val();

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
			"sel_nominee"	: sel_nominee
		},
		url: "../main_exec.php",
		success: function(response){
			if (ins_info_flag == 0)
			{
				reg_name		= mb_name;
				reg_phone		= mb_phone;
				ins_info_flag		= 1;
			}

			if (response == "Y")
			{
				location.href="./popup_pic_input.php?sel_nominee="+sel_nominee;
			}else if (response == "Y1"){
				location.href="./popup_pic_input.php?sel_nominee="+sel_nominee;
			}else if (response == "D"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#dupli_nominee_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$('#cboxWrapper').css('backgroundColor', "");
					$('#cboxLoadedContent').css('backgroundColor', "");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
				}});

			}else if (response == "AD"){
				$.colorbox({innerWidth:"95%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#all_dupli_nominee_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$('#cboxWrapper').css('backgroundColor', "");
					$('#cboxLoadedContent').css('backgroundColor', "");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
				}});
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
			}
		}
	});
}

function ins_info()
{
	var mb_name		= $("#mb_name").val();
	var mb_phone1		= $("#mb_phone1").val();
	var mb_phone2		= $("#mb_phone2").val();
	var mb_phone3		= $("#mb_phone3").val();
	var mb_phone		= mb_phone1 + mb_phone2 + mb_phone3;
	sel_nominee			= $("#sel_nominee").val();

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
			"sel_nominee"	: sel_nominee
		},
		url: "../main_exec.php",
		success: function(response){
			if (ins_info_flag == 0)
			{
				reg_name		= mb_name;
				reg_phone		= mb_phone;
				ins_info_flag		= 1;
			}

			if (response == "Y")
			{
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:true, closeButton:false, overlayClose: true, fadeOut: 300, href:"#reg_pic_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
			}else if (response == "Y1"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:true, closeButton:false, overlayClose: true, fadeOut: 300, href:"#reg_pic_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
			}else if (response == "D"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#dupli_nominee_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$('#cboxWrapper').css('backgroundColor', "");
					$('#cboxLoadedContent').css('backgroundColor', "");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
				}});

			}else if (response == "AD"){
				$.colorbox({innerWidth:"95%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#all_dupli_nominee_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$('#cboxWrapper').css('backgroundColor', "");
					$('#cboxLoadedContent').css('backgroundColor', "");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
				}});
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
			}
		}
	});
}

$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = 'file_upload.php';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 99900000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
		// 파일 삭제
		del_fileview();
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
			img_name = file.name;
            var node = $('<p/>');
                   // .append($('<span/>').text(file.name));
			  $("#image_up_name").val(file.name);
            if (!index) {
                //node
                  //  .append('<br>')
                    //.append(uploadButton.clone(true).data(data));
				//uploadButton.clone(true).data(data);
				data.submit();
            }

            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
		$(".mask").show();
		$("html body").css("overflow","hidden");
		Timer();
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

function Timer() {
	setTimeout("hide_loading();",3000);
}

function hide_loading(){
	$(".mask").hide();
	$("html body").css("overflow","");
}

function del_fileview()
{
	$("#files").html("");
}

function ins_pic_info()
{
	var mb_baby_name		= $("#mb_baby_name").val();
	var mb_baby_month		= $("#mb_baby_month").val();
	var mb_pic				= img_name;
	var mb_youtube_url	= $("#youtube_url").val();


	if (mb_baby_name == "")
	{
		alert('아기 이름을 입력해 주세요.');
		$("#mb_baby_name").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_baby_month == "")
	{
		alert('아기 개월수를 입력해 주세요.');
		$("#mb_baby_month").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_pic === null)
	{
		if (mb_youtube_url == "")
		{
			alert('사진 혹은 유튜브URL을 입력해 주세요.');
			//chk_ins = 0;
			return false;
		}
	}

	$.ajax({
		type:"POST",
		data:{
			"exec"					: "insert_pic_info",
			"mb_baby_name"	: mb_baby_name,
			"mb_baby_month"	: mb_baby_month,
			"mb_pic"				: mb_pic,
			"mb_youtube_url"	: mb_youtube_url
		},
		url: "../main_exec.php",
		success: function(response){
			if (response	== "Y")
			{
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#nominee_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});

				$("#nominee_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
			}else if (response	== "Y1"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#nominee_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
				$("#nominee_gift_image").attr("src","images/popup/gift_coupon.png");
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 버튼을 클릭해주세요.");
			}
		}
	});
}

function ins_pic_info2()
{
	var mb_baby_name		= $("#mb_baby_name").val();
	var mb_baby_month		= $("#mb_baby_month").val();
	var mb_pic				= img_name;
	var mb_youtube_url	= $("#youtube_url").val();


	if (mb_baby_name == "")
	{
		alert('아기 이름을 입력해 주세요.');
		$("#mb_baby_name").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_baby_month == "")
	{
		alert('아기 개월수를 입력해 주세요.');
		$("#mb_baby_month").focus();
		//chk_ins = 0;
		return false;
	}

	if (mb_pic === null)
	{
		if (mb_youtube_url == "")
		{
			alert('사진 혹은 유튜브URL을 입력해 주세요.');
			//chk_ins = 0;
			return false;
		}
	}

	$.ajax({
		type:"POST",
		data:{
			"exec"					: "insert_pic_info",
			"mb_baby_name"	: mb_baby_name,
			"mb_baby_month"	: mb_baby_month,
			"mb_pic"				: mb_pic,
			"mb_youtube_url"	: mb_youtube_url
		},
		url: "../main_exec.php",
		success: function(response){
			if (response	== "Y")
			{
				location.href="./popup_nominee_comp.php?gift=delivery";
			}else if (response	== "Y1"){
				location.href="./popup_nominee_comp.php?gift=coupon";
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 버튼을 클릭해주세요.");
			}
		}
	});
}

function ins_vote_info()
{
	var vote_name			= $("#vote_name").val();
	var vote_phone1		= $("#vote_phone1").val();
	var vote_phone2		= $("#vote_phone2").val();
	var vote_phone3		= $("#vote_phone3").val();
	var mb_youtube_url	= $("#youtube_url").val();
	var vote_phone			= vote_phone1 + vote_phone2 + vote_phone3;

	if (vote_name == "")
	{
		alert('엄마(아빠) 이름을 입력해 주세요.');
		$("#vote_name").focus();
		//chk_ins = 0;
		return false;
	}

	if (vote_phone2 == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#vote_phone2").focus();
		//chk_ins = 0;
		return false;
	}

	if (vote_phone3 == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#vote_phone3").focus();
		//chk_ins = 0;
		return false;
	}

	if (chk_vote_flag == 0)
	{
		alert("개인정보 취급 동의/광고동의를 안 하셨습니다");
		//chk_ins = 0;
		return false;
	}

	$.ajax({
		type:"POST",
		data:{
			"exec"				: "insert_vote_info",
			"vote_name"		: vote_name,
			"vote_phone"	: vote_phone,
			"vote_idx"		: vote_idx
		},
		url: "../main_exec.php",
		success: function(response){
			var resArray	= response.split("||");
			if (resArray[1] == "DELIVERY")
			{
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
			}else if (resArray[1] == "DISCOUNT"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon.png");
			}else if (resArray[1] == "WATER"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_waterbox.png");
			}else if (resArray[1] == "SKIN"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_skincare.png");
			}else if (resArray[1] == "CLEAN"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onLoad:function() {
					//$('html, body').css('overflow', 'hidden'); // page scrollbars off
				}, 
				onComplete: function(){
					var bg = "#f3f0f0";
					$('#cboxWrapper').css('backgroundColor', bg);
					$('#cboxLoadedContent').css('backgroundColor', bg);
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
					$('html, body').css('overflow', ''); // page scrollbars off
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_fabric.png");
			}else if (resArray[1] == "no"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#dupli_vote_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$('#cboxWrapper').css('backgroundColor', "");
					$('#cboxLoadedContent').css('backgroundColor', "");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
				}});
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
			}
		}
	});
}

function ins_vote_info2()
{
	var vote_name			= $("#vote_name").val();
	var vote_phone1		= $("#vote_phone1").val();
	var vote_phone2		= $("#vote_phone2").val();
	var vote_phone3		= $("#vote_phone3").val();
	var mb_youtube_url	= $("#youtube_url").val();
	var vote_phone			= vote_phone1 + vote_phone2 + vote_phone3;
	vote_idx					= $("#vote_idx").val();
	if (vote_name == "")
	{
		alert('엄마(아빠) 이름을 입력해 주세요.');
		$("#vote_name").focus();
		//chk_ins = 0;
		return false;
	}

	if (vote_phone2 == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#vote_phone2").focus();
		//chk_ins = 0;
		return false;
	}

	if (vote_phone3 == "")
	{
		alert('전화번호를 입력해 주세요.');
		$("#vote_phone3").focus();
		//chk_ins = 0;
		return false;
	}

	if (chk_vote_flag == 0)
	{
		alert("개인정보 취급 동의/광고동의를 안 하셨습니다");
		//chk_ins = 0;
		return false;
	}

	$.ajax({
		type:"POST",
		data:{
			"exec"				: "insert_vote_info",
			"vote_name"		: vote_name,
			"vote_phone"	: vote_phone,
			"vote_idx"		: vote_idx
		},
		url: "../main_exec.php",
		success: function(response){
			var resArray	= response.split("||");
			if (resArray[1] == "DELIVERY")
			{
				location.href="./popup_vote_comp.php?gift=delivery";
			}else if (resArray[1] == "DISCOUNT"){
				location.href="./popup_vote_comp.php?gift=coupon";
			}else if (resArray[1] == "WATER"){
				location.href="./popup_vote_comp.php?gift=water";
			}else if (resArray[1] == "SKIN"){
				location.href="./popup_vote_comp.php?gift=skin";
			}else if (resArray[1] == "CLEAN"){
				location.href="./popup_vote_comp.php?gift=clean";
			}else if (resArray[1] == "no"){
				$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#dupli_vote_popup", onComplete: function(){
					$("#cboxContent").css("background","none");
					$('#cboxWrapper').css('backgroundColor', "");
					$('#cboxLoadedContent').css('backgroundColor', "");
					$("#colorbox").width($("body").width());
					$("#cboxWrapper").width($("body").width());
				},
				onClosed: function(){
					del_info();
					$("#cboxContent").css("background","#fff");
				}});
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
			}
		}
	});
}

function pop_search_nominee()
{
	var search_baby_name	= $("#search_baby_name").val();
	var vote_param				= "all";

	$.ajax({
		type:"POST",
		data:{
			"vote_param"			: vote_param,
			"search_baby_name"	: search_baby_name
		},
		url: "./ajax_list.php",
		success: function(response){
			$.colorbox.close();
			$("#ajax_change").html(response);
		}
	});
}

function go_vote(cidx)
{
	vote_idx	= cidx;

	if (ins_info_flag == 0)
	{
		$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_input_popup", onComplete: function(){
			$("#cboxContent").css("background","none");
			$("#colorbox").width($("body").width());
			$("#cboxWrapper").width($("body").width());
		},
		onLoad:function() {
			//$('html, body').css('overflow', 'hidden'); // page scrollbars off
		}, 
		onComplete: function(){
			var bg = "#f3f0f0";
			$('#cboxWrapper').css('backgroundColor', bg);
			$('#cboxLoadedContent').css('backgroundColor', bg);
		},
		onClosed: function(){
			del_info();
			$("#cboxContent").css("background","#fff");
			$('html, body').css('overflow', ''); // page scrollbars off
		}});
	}else{
		$.ajax({
			type:"POST",
			data:{
				"exec"				: "insert_vote_info",
				"vote_name"		: reg_name,
				"vote_phone"	: reg_phone,
				"vote_idx"		: vote_idx
			},
			url: "../main_exec.php",
			success: function(response){
				var resArray	= response.split("||");
				if (resArray[1] == "DELIVERY")
				{
					$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
						$("#cboxContent").css("background","none");
						$("#colorbox").width($("body").width());
						$("#cboxWrapper").width($("body").width());
					},
					onLoad:function() {
						//$('html, body').css('overflow', 'hidden'); // page scrollbars off
					}, 
					onComplete: function(){
						var bg = "#f3f0f0";
						$('#cboxWrapper').css('backgroundColor', bg);
						$('#cboxLoadedContent').css('backgroundColor', bg);
					},
					onClosed: function(){
						del_info();
						$("#cboxContent").css("background","#fff");
						$('html, body').css('overflow', ''); // page scrollbars off
					}});
					$("#vote_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
				}else if (resArray[1] == "DISCOUNT"){
					$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
						$("#cboxContent").css("background","none");
						$("#colorbox").width($("body").width());
						$("#cboxWrapper").width($("body").width());
					},
					onLoad:function() {
						//$('html, body').css('overflow', 'hidden'); // page scrollbars off
					}, 
					onComplete: function(){
						var bg = "#f3f0f0";
						$('#cboxWrapper').css('backgroundColor', bg);
						$('#cboxLoadedContent').css('backgroundColor', bg);
					},
					onClosed: function(){
						del_info();
						$("#cboxContent").css("background","#fff");
						$('html, body').css('overflow', ''); // page scrollbars off
					}});
					$("#vote_gift_image").attr("src","images/popup/gift_coupon.png");
				}else if (resArray[1] == "WATER"){
					$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
						$("#cboxContent").css("background","none");
						$("#colorbox").width($("body").width());
						$("#cboxWrapper").width($("body").width());
					},
					onLoad:function() {
						//$('html, body').css('overflow', 'hidden'); // page scrollbars off
					}, 
					onComplete: function(){
						var bg = "#f3f0f0";
						$('#cboxWrapper').css('backgroundColor', bg);
						$('#cboxLoadedContent').css('backgroundColor', bg);
					},
					onClosed: function(){
						del_info();
						$("#cboxContent").css("background","#fff");
						$('html, body').css('overflow', ''); // page scrollbars off
					}});
					$("#vote_gift_image").attr("src","images/popup/gift_coupon_waterbox.png");
				}else if (resArray[1] == "SKIN"){
					$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
						$("#cboxContent").css("background","none");
						$("#colorbox").width($("body").width());
						$("#cboxWrapper").width($("body").width());
					},
					onLoad:function() {
						//$('html, body').css('overflow', 'hidden'); // page scrollbars off
					}, 
					onComplete: function(){
						var bg = "#f3f0f0";
						$('#cboxWrapper').css('backgroundColor', bg);
						$('#cboxLoadedContent').css('backgroundColor', bg);
					},
					onClosed: function(){
						del_info();
						$("#cboxContent").css("background","#fff");
						$('html, body').css('overflow', ''); // page scrollbars off
					}});
					$("#vote_gift_image").attr("src","images/popup/gift_coupon_skincare.png");
				}else if (resArray[1] == "CLEAN"){
					$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
						$("#cboxContent").css("background","none");
						$("#colorbox").width($("body").width());
						$("#cboxWrapper").width($("body").width());
					},
					onLoad:function() {
						//$('html, body').css('overflow', 'hidden'); // page scrollbars off
					}, 
					onComplete: function(){
						var bg = "#f3f0f0";
						$('#cboxWrapper').css('backgroundColor', bg);
						$('#cboxLoadedContent').css('backgroundColor', bg);
					},
					onClosed: function(){
						del_info();
						$("#cboxContent").css("background","#fff");
						$('html, body').css('overflow', ''); // page scrollbars off
					}});
					$("#vote_gift_image").attr("src","images/popup/gift_coupon_fabric.png");
				}else if (resArray[1] == "no"){
					$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#dupli_vote_popup", onComplete: function(){
						$("#cboxContent").css("background","none");
						$('#cboxWrapper').css('backgroundColor', "");
						$('#cboxLoadedContent').css('backgroundColor', "");
						$("#colorbox").width($("body").width());
						$("#cboxWrapper").width($("body").width());
					},
					onClosed: function(){
						del_info();
						$("#cboxContent").css("background","#fff");
					}});
				}else{
					alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
				}
			}
		});
	}
}

function go_vote2(cidx)
{
	vote_idx	= cidx;

	if (confirm("이후보에 투표하시겠습니까?"))
	{
		$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_notice", onComplete: function(){
			$("#cboxContent").css("background","none");
			$('#cboxWrapper').css('backgroundColor', "");
			$('#cboxLoadedContent').css('backgroundColor', "");
			$("#colorbox").width($("body").width());
			$("#cboxWrapper").width($("body").width());
		},
		onClosed: function(){
			del_info();
			$("#cboxContent").css("background","#fff");
		}});
	}
}

function go_vote3()
{
		if (ins_info_flag == 0)
		{
			location.href="./popup_vote_input.php?vote_idx="+vote_idx;
		}else{
			$.ajax({
				type:"POST",
				data:{
					"exec"				: "insert_vote_info",
					"vote_name"		: reg_name,
					"vote_phone"	: reg_phone,
					"vote_idx"		: vote_idx
				},
				url: "../main_exec.php",
				success: function(response){
					var resArray	= response.split("||");
					if (resArray[1] == "DELIVERY")
					{
						$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxContent").css("background","none");
							$("#colorbox").width($("body").width());
							$("#cboxWrapper").width($("body").width());
						},
						onLoad:function() {
							//$('html, body').css('overflow', 'hidden'); // page scrollbars off
						}, 
						onComplete: function(){
							var bg = "#f3f0f0";
							$('#cboxWrapper').css('backgroundColor', bg);
							$('#cboxLoadedContent').css('backgroundColor', bg);
						},
						onClosed: function(){
							del_info();
							$("#cboxContent").css("background","#fff");
							$('html, body').css('overflow', ''); // page scrollbars off
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
					}else if (resArray[1] == "DISCOUNT"){
						$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxContent").css("background","none");
							$("#colorbox").width($("body").width());
							$("#cboxWrapper").width($("body").width());
						},
						onLoad:function() {
							//$('html, body').css('overflow', 'hidden'); // page scrollbars off
						}, 
						onComplete: function(){
							var bg = "#f3f0f0";
							$('#cboxWrapper').css('backgroundColor', bg);
							$('#cboxLoadedContent').css('backgroundColor', bg);
						},
						onClosed: function(){
							del_info();
							$("#cboxContent").css("background","#fff");
							$('html, body').css('overflow', ''); // page scrollbars off
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon.png");
					}else if (resArray[1] == "WATER"){
						$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxContent").css("background","none");
							$("#colorbox").width($("body").width());
							$("#cboxWrapper").width($("body").width());
						},
						onLoad:function() {
							//$('html, body').css('overflow', 'hidden'); // page scrollbars off
						}, 
						onComplete: function(){
							var bg = "#f3f0f0";
							$('#cboxWrapper').css('backgroundColor', bg);
							$('#cboxLoadedContent').css('backgroundColor', bg);
						},
						onClosed: function(){
							del_info();
							$("#cboxContent").css("background","#fff");
							$('html, body').css('overflow', ''); // page scrollbars off
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_waterbox.png");
					}else if (resArray[1] == "SKIN"){
						$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxContent").css("background","none");
							$("#colorbox").width($("body").width());
							$("#cboxWrapper").width($("body").width());
						},
						onLoad:function() {
							//$('html, body').css('overflow', 'hidden'); // page scrollbars off
						}, 
						onComplete: function(){
							var bg = "#f3f0f0";
							$('#cboxWrapper').css('backgroundColor', bg);
							$('#cboxLoadedContent').css('backgroundColor', bg);
						},
						onClosed: function(){
							del_info();
							$("#cboxContent").css("background","#fff");
							$('html, body').css('overflow', ''); // page scrollbars off
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_skincare.png");
					}else if (resArray[1] == "CLEAN"){
						$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxContent").css("background","none");
							$("#colorbox").width($("body").width());
							$("#cboxWrapper").width($("body").width());
						},
						onLoad:function() {
							//$('html, body').css('overflow', 'hidden'); // page scrollbars off
						}, 
						onComplete: function(){
							var bg = "#f3f0f0";
							$('#cboxWrapper').css('backgroundColor', bg);
							$('#cboxLoadedContent').css('backgroundColor', bg);
						},
						onClosed: function(){
							del_info();
							$("#cboxContent").css("background","#fff");
							$('html, body').css('overflow', ''); // page scrollbars off
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_fabric.png");
					}else if (resArray[1] == "no"){
						$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#dupli_vote_popup", onComplete: function(){
							$("#cboxContent").css("background","none");
							$('#cboxWrapper').css('backgroundColor', "");
							$('#cboxLoadedContent').css('backgroundColor', "");
							$("#colorbox").width($("body").width());
							$("#cboxWrapper").width($("body").width());
						},
						onClosed: function(){
							del_info();
							$("#cboxContent").css("background","#fff");
						}});
					}else{
						alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
					}
				}
			});
		}
}

function open_pop(param)
{
	if (~param.indexOf("detail_pic_popup"))
	{
		$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#"+param, onComplete: function(){
			$("#cboxContent").css("background","none");
			$('#cboxWrapper').css('backgroundColor', "");
			$('#cboxLoadedContent').css('backgroundColor', "");
			$("#colorbox").width($("body").width());
			$("#cboxWrapper").width($("body").width());
		},
		onClosed: function(){
			del_info();
			$("#cboxContent").css("background","#fff");
		}});

	}else if (~param.indexOf("agree_popup")){
		$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:"100%", inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#agree_popup", onComplete: function(){
			$("#cboxContent").css("background","none");
			$("#colorbox").width($("body").width());
			$("#cboxWrapper").width($("body").width());
		},
		onComplete : function() { 
			   $(this).colorbox.resize(); 
		  },
		onLoad:function() {
			$('html, body').css('overflow', ''); // page scrollbars off
		}, 
		onClosed: function(){
			del_info();
			$("#cboxContent").css("background","#fff");
		}});
	}
}

function sort_list(param)
{
	if (param == "all")
	{
		$("#sort_image0").attr("src","images/btn_sort_1_on.jpg");
		$("#sort_image1").attr("src","images/btn_sort_2_off.jpg");
		$("#sort_image2").attr("src","images/btn_sort_3_off.jpg");
		$("#sort_image3").attr("src","images/btn_sort_4_off.jpg");
		$("#sort_image4").attr("src","images/btn_sort_5_off.jpg");
		$("#sort_image5").attr("src","images/btn_sort_6_off.jpg");
	}else if (param == "1"){
		$("#sort_image0").attr("src","images/btn_sort_1_off.jpg");
		$("#sort_image1").attr("src","images/btn_sort_2_on.jpg");
		$("#sort_image2").attr("src","images/btn_sort_3_off.jpg");
		$("#sort_image3").attr("src","images/btn_sort_4_off.jpg");
		$("#sort_image4").attr("src","images/btn_sort_5_off.jpg");
		$("#sort_image5").attr("src","images/btn_sort_6_off.jpg");
	}else if (param == "2"){
		$("#sort_image0").attr("src","images/btn_sort_1_off.jpg");
		$("#sort_image1").attr("src","images/btn_sort_2_off.jpg");
		$("#sort_image2").attr("src","images/btn_sort_3_on.jpg");
		$("#sort_image3").attr("src","images/btn_sort_4_off.jpg");
		$("#sort_image4").attr("src","images/btn_sort_5_off.jpg");
		$("#sort_image5").attr("src","images/btn_sort_6_off.jpg");
	}else if (param == "3"){
		$("#sort_image0").attr("src","images/btn_sort_1_off.jpg");
		$("#sort_image1").attr("src","images/btn_sort_2_off.jpg");
		$("#sort_image2").attr("src","images/btn_sort_3_off.jpg");
		$("#sort_image3").attr("src","images/btn_sort_4_on.jpg");
		$("#sort_image4").attr("src","images/btn_sort_5_off.jpg");
		$("#sort_image5").attr("src","images/btn_sort_6_off.jpg");
	}else if (param == "4"){
		$("#sort_image0").attr("src","images/btn_sort_1_off.jpg");
		$("#sort_image1").attr("src","images/btn_sort_2_off.jpg");
		$("#sort_image2").attr("src","images/btn_sort_3_off.jpg");
		$("#sort_image3").attr("src","images/btn_sort_4_off.jpg");
		$("#sort_image4").attr("src","images/btn_sort_5_on.jpg");
		$("#sort_image5").attr("src","images/btn_sort_6_off.jpg");
	}else if (param == "5"){
		$("#sort_image0").attr("src","images/btn_sort_1_off.jpg");
		$("#sort_image1").attr("src","images/btn_sort_2_off.jpg");
		$("#sort_image2").attr("src","images/btn_sort_3_off.jpg");
		$("#sort_image3").attr("src","images/btn_sort_4_off.jpg");
		$("#sort_image4").attr("src","images/btn_sort_5_off.jpg");
		$("#sort_image5").attr("src","images/btn_sort_6_on.jpg");
	}
	vote_sort	= param;

	$.ajax({
		type:"POST",
		data:{
			"vote_param"		: param
		},
		url: "./ajax_list.php",
		success: function(response){
			$("#ajax_change").html(response);
		}
	});
}

function gift_search()
{
	var search_name		= $("#search_name").val();
	var search_phone	= $("#search_phone1").val() + $("#search_phone2").val() + $("#search_phone3").val();

	if (search_name == "")
	{
		alert('엄마(아빠) 이름을 입력해주세요.');
		$("#search_name").focus();
		//chk_ins = 0;
		return false;
	}

	if ($("#search_phone2").val() == "")
	{
		alert('전화번호를 입력해주세요.');
		$("#search_phone2").focus();
		//chk_ins = 0;
		return false;
	}

	if ($("#search_phone3").val() == "")
	{
		alert('전화번호를 입력해주세요.');
		$("#search_phone3").focus();
		//chk_ins = 0;
		return false;
	}

	$.ajax({
		type:"POST",
		data:{
			"search_name"		: search_name,
			"search_phone"		: search_phone
		},
		url: "./ajax_search2.php",
		success: function(response){
			//$("#mygift_contents3").show();
			//$("#mygift_contents4").hide();
			$("#search_list_area").html(response);
		}
	});

}



function mb_check()
{
	if (chk_mb_flag == 0)
	{
		$("#mb_agree").attr("src","images/popup/checked.png");
		chk_mb_flag = 1;
	}else{
		$("#mb_agree").attr("src","images/popup/check.png");
		chk_mb_flag = 0;
	}
}

function vote_check()
{
	if (chk_vote_flag == 0)
	{
		$("#vote_agree").attr("src","images/popup/checked.png");
		chk_vote_flag = 1;
	}else{
		$("#vote_agree").attr("src","images/popup/check.png");
		chk_vote_flag = 0;
	}
}

function back_input()
{
	$.colorbox({innerWidth:"100%", initialWidth:"95%", innerHeight:'100%', inline:true, opacity:"0", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#reg_input_popup", onComplete: function(){
		$("#cboxContent").css("background","none");
		$("#colorbox").width($("body").width());
		$("#cboxWrapper").width($("body").width());
	},
	onLoad:function() {
		//$('html, body').css('overflow', 'hidden'); // page scrollbars off
	}, 
	onComplete: function(){
		var bg = "#f3f0f0";
		$('#cboxWrapper').css('backgroundColor', bg);
		$('#cboxLoadedContent').css('backgroundColor', bg);
	},
	onClosed: function(){
		del_info();
		$("#cboxContent").css("background","#fff");
		$('html, body').css('overflow', ''); // page scrollbars off
	}});

}

function nominee_search()
{
	$.colorbox({innerWidth:"100%", initialWidth:"95%", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#nominee_search_popup", onComplete: function(){
		$("#cboxContent").css("background","none");
		$('#cboxWrapper').css('backgroundColor', "");
		$('#cboxLoadedContent').css('backgroundColor', "");
		$("#colorbox").width($("body").width());
		$("#cboxWrapper").width($("body").width());
	},
	onClosed: function(){
		del_info();
		$("#cboxContent").css("background","#fff");
	}});

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

function only_num2(obj)
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
		alert("현재 개월수는 숫자로 입력해주세요.");
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
	if (val.length == 4)
	{
		$("#vote_phone3").focus();
	}
}

function chk_len4(val)
{
	if (val.length == 4)
	{
		$("#vote_phone3").blur();
	}
}

function chk_len5(val)
{
	if (val.length == 4)
	{
		$("#search_phone3").focus();
	}
}

function chk_len6(val)
{
	if (val.length == 4)
	{
		$("#search_phone3").blur();
	}
}



function tab_upload_use(param)
{
	if (param == "pic")
	{
		$("#mov_input_area").hide();
		$("#pic_input_area").show();
	}else{
		$("#pic_input_area").hide();
		$("#mov_input_area").show();
	}
}

function del_info()
{
	$("#mb_name").val("");
	$("#mb_phone1").val("010");
	$("#mb_phone2").val("");
	$("#mb_phone3").val("");
	$("#mb_agree").attr("src","images/popup/check.png");
	chk_mb_flag = 0;
	$("#vote_name").val("");
	$("#vote_phone1").val("010");
	$("#vote_phone2").val("");
	$("#vote_phone3").val("");
	$("#vote_agree").attr("src","images/popup/check.png");
	chk_vote_flag = 0;
	$("#mb_baby_name").val("");
	$("#image_up_name").val("");
	$("#files").html('<img src="images/popup/pre_pic.png" />');
	$("#search_baby_name").val("");
	$('html, body').css('overflow', ''); // page scrollbars off

}

function chk_link()
{
	var youtube_url	= $("#youtube_url").val();
	if (youtube_url	== "")
	{
		alert('영상 URL을 입력해주세요.');
		return false;
	}
	alert('영상이 올라갔습니다.');
}

function sns_share(media, flag)
{
	if (media == "fb")
	{

		var newWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('http://awards.babience-event.com/PC/index.php'),'sharer','toolbar=0,status=0,width=600,height=325');
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
		var newWindow = window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent("후보 지원해도, 심사만해도 100% 당첨되는 특별한 시상식에 여러분을 초대합니다.") + '&url='+ encodeURIComponent('http://bit.ly/1OcWJ8X'),'sharer','toolbar=0,status=0,width=600,height=325');
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
		  label: "후보 지원해도, 심사만해도 100% 당첨되는 특별한 시상식에 여러분을 초대합니다. >> http://bit.ly/1OcWRFF",
		  image: {
			src: 'http://awards.babience-event.com/MOBILE/images/sns.jpg',
			width: '1200',
			height: '630'
		  },
		  webButton: {
			text: 'Babience Awards',
			url: 'http://awards.babience-event.com/?media=kt' // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
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
			url: 'http://awards.babience-event.com/',
			text: '후보 지원해도, 심사만해도 100% 당첨되는 특별한 시상식에 여러분을 초대합니다. >> http://bit.ly/1OcWRFF'
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
