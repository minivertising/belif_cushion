function change_tab(param)
{
	if (param == "1")
	{
		$(".change_tab").hide();
		$("#benefit_contents").show();
		$("#mygift_contents").hide();
		$("#tab_image1").attr("src","images/tab_01_on.png");
		$("#tab_image2").attr("src","images/tab_02_off.png");
		$("#tab_image3").attr("src","images/tab_03_off.png");
		$("#tab_image4").attr("src","images/tab_04_off.png");
		$(".wrap_sec_contest_gift").hide();
		$(".wrap_sec_voter_gift").hide();
	}else if (param == "2"){
		$(".change_tab").hide();
		$("#nominee_contents").show();
		$("#mygift_contents").hide();
		$("#tab_image1").attr("src","images/tab_01_off.png");
		$("#tab_image2").attr("src","images/tab_02_on.png");
		$("#tab_image3").attr("src","images/tab_03_off.png");
		$("#tab_image4").attr("src","images/tab_04_off.png");
		$(".wrap_sec_contest_gift").show();
		$(".wrap_sec_voter_gift").hide();
	}else if (param == "3"){
		$(".change_tab").hide();
		$("#vote_contents").show();
		$("#mygift_contents").hide();
		$("#tab_image1").attr("src","images/tab_01_off.png");
		$("#tab_image2").attr("src","images/tab_02_off.png");
		$("#tab_image3").attr("src","images/tab_03_on.png");
		$("#tab_image4").attr("src","images/tab_04_off.png");
		$(".wrap_sec_contest_gift").hide();
		$(".wrap_sec_voter_gift").show();

		$.ajax({
			type:"POST",
			data:{
				"pg"		: "1",
				"vote_param": "all"
			},
			url: "./ajax_list.php",
			success: function(response){
				$(".sec_list").html(response);
			}
		});
	}else if (param == "4"){
		$(".change_tab").hide();
		$("#mygift_contents").show();
		$("#tab_image1").attr("src","images/tab_01_off.png");
		$("#tab_image2").attr("src","images/tab_02_off.png");
		$("#tab_image3").attr("src","images/tab_03_off.png");
		$("#tab_image4").attr("src","images/tab_04_on.png");
		$(".wrap_sec_contest_gift").hide();
		$(".wrap_sec_voter_gift").hide();
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
	$.colorbox({width:"542px", height:"542px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#reg_input_popup", onComplete: function(){
		$("#cboxLoadedContent").height(500);
		$("#cboxContent").css("background","none");
	},
	onClosed: function(){
		del_info();
	}});

}

function ins_info()
{
	var mb_name		= $("#mb_name").val();
	var mb_phone1		= $("#mb_phone1").val();
	var mb_phone2		= $("#mb_phone2").val();
	var mb_phone3		= $("#mb_phone3").val();
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
				$.colorbox({width:"542px", height:"742px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#reg_pic_popup", onComplete: function(){
					$("#cboxLoadedContent").height(700);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
			}else if (response == "Y1"){
				$.colorbox({width:"542px", height:"742px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#reg_pic_popup", onComplete: function(){
					$("#cboxLoadedContent").height(700);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
			}else if (response == "D"){
				$.colorbox({width:"542px", height:"342px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#dupli_nominee_popup", onComplete: function(){
					$("#cboxLoadedContent").height(300);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
			}else if (response == "AD"){
				$.colorbox({width:"542px", height:"342px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#all_dupli_nominee_popup", onComplete: function(){
					$("#cboxLoadedContent").height(300);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
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
/*
	var url = 'file_upload.php',
        //uploadButton = $('<button/>')
        uploadButton = $('#upload_pic')
            .addClass('btn btn-primary')
            //.prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
*/
			/*
		$("#upload_pic").on('click', function(){
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
		});
		*/
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
		$(".loading").show();
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
	$(".loading").hide();
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
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#nominee_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#nominee_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
			}else if (response	== "Y1"){
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#nominee_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#nominee_gift_image").attr("src","images/popup/gift_coupon.png");
			}else{
				alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
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
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
			}else if (resArray[1] == "DISCOUNT"){
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon.png");
			}else if (resArray[1] == "WATER"){
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_waterbox.png");
			}else if (resArray[1] == "SKIN"){
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_skincare.png");
			}else if (resArray[1] == "CLEAN"){
				$.colorbox({width:"542px", height:"700px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
					$("#cboxLoadedContent").height(658);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
				}});
				$("#vote_gift_image").attr("src","images/popup/gift_coupon_fabric.png");
			}else if (resArray[1] == "no"){
				$.colorbox({width:"542px", height:"342px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#dupli_vote_popup", onComplete: function(){
					$("#cboxLoadedContent").height(300);
					$("#cboxContent").css("background","none");
				},
				onClosed: function(){
					del_info();
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
			$(".sec_list").html(response);
		}
	});
}

function go_vote(cidx)
{
	vote_idx	= cidx;

	if (confirm("이후보에 투표하시겠습니까?"))
	{
		$.colorbox({width:"692px", height:"412px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_notice", onComplete: function(){
			$("#cboxLoadedContent").height(370);
			$("#cboxContent").css("background","none");
		},
		onClosed: function(){
			del_info();
		}});
	}
}

function go_vote2()
{

		if (ins_info_flag == 0)
		{
			$.colorbox({width:"542px", height:"542px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_input_popup", onComplete: function(){
				$("#cboxLoadedContent").height(500);
				$("#cboxContent").css("background","none");
			},
			onClosed: function(){
				del_info();
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
						$.colorbox({width:"542px", height:"697px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxLoadedContent").height(655);
							$("#cboxContent").css("background","none");
						},
						onClosed: function(){
							del_info();
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_delivery.png");
					}else if (resArray[1] == "DISCOUNT"){
						$.colorbox({width:"542px", height:"697px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxLoadedContent").height(655);
							$("#cboxContent").css("background","none");
						},
						onClosed: function(){
							del_info();
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon.png");
					}else if (resArray[1] == "WATER"){
						$.colorbox({width:"542px", height:"697px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxLoadedContent").height(655);
							$("#cboxContent").css("background","none");
						},
						onClosed: function(){
							del_info();
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_waterbox.png");
					}else if (resArray[1] == "SKIN"){
						$.colorbox({width:"542px", height:"697px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxLoadedContent").height(655);
							$("#cboxContent").css("background","none");
						},
						onClosed: function(){
							del_info();
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_skincare.png");
					}else if (resArray[1] == "CLEAN"){
						$.colorbox({width:"542px", height:"697px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_comp_popup", onComplete: function(){
							$("#cboxLoadedContent").height(655);
							$("#cboxContent").css("background","none");
						},
						onClosed: function(){
							del_info();
						}});
						$("#vote_gift_image").attr("src","images/popup/gift_coupon_fabric.png");
					}else if (resArray[1] == "no"){
						$.colorbox({width:"542px", height:"342px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#dupli_vote_popup", onComplete: function(){
							$("#cboxLoadedContent").height(300);
							$("#cboxContent").css("background","none");
						},
						onClosed: function(){
							del_info();
						}});
					}else{
						alert("접속자가 많아 참여가 지연되고 있습니다. 다시 참여해 주세요.");
					}
				}
			});
	}
}

function open_pop(param, paramw, paramh)
{
	if (~param.indexOf("detail_pic_popup"))
	{
		if (paramw == '0')
		{
			paramw	= 530;
			paramh	= 292 + 300;
			resizeHeight	= 300;
		}else{
			resizeHeight = (paramh * 530) / paramw;
			paramh		= 292 + resizeHeight;
		}
			//paramw = "692";
		//if (paramh == '0')
		//	paramh = "592";
		// w= 530 h = 300
		$.colorbox({width:"692px", height:paramh+"px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#"+param, onComplete: function(){
			$("#cboxLoadedContent").height(paramh-40);
			$("#cboxContent").css("background","none");
			$(".pic").height(resizeHeight);
			$(".pic img").height(resizeHeight);
			$(".p_mid_view").height(paramh-5);
			$(".p_position").height(paramh-5);
		},
		onClosed: function(){
			del_info();
		}});
	}else if (~param.indexOf("agree_popup")){
		$.colorbox({width:"442px", height:"522px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#agree_popup", onComplete: function(){
			$("#cboxLoadedContent").height(480);
			$("#cboxContent").css("background","none");
		},
		onClosed: function(){
			del_info();
		}});
	}else if (~param.indexOf("agree2_popup")){
		$.colorbox({width:"442px", height:"522px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: true, fadeOut: 300, href:"#agree_popup2", onComplete: function(){
			$("#cboxLoadedContent").height(480);
			$("#cboxContent").css("background","none");
		},
		onClosed: function(){
			del_info();
		}});
	}
}

function sort_list(param)
{
	if (param == "all")
	{
		$("#sort_image0").attr("src","images/btn_vote_cate_all_on.png");
		$("#sort_image1").attr("src","images/btn_vote_cate_1_off.png");
		$("#sort_image2").attr("src","images/btn_vote_cate_2_off.png");
		$("#sort_image3").attr("src","images/btn_vote_cate_3_off.png");
		$("#sort_image4").attr("src","images/btn_vote_cate_4_off.png");
		$("#sort_image5").attr("src","images/btn_vote_cate_5_off.png");
	}else if (param == "1"){
		$("#sort_image0").attr("src","images/btn_vote_cate_all_off.png");
		$("#sort_image1").attr("src","images/btn_vote_cate_1_on.png");
		$("#sort_image2").attr("src","images/btn_vote_cate_2_off.png");
		$("#sort_image3").attr("src","images/btn_vote_cate_3_off.png");
		$("#sort_image4").attr("src","images/btn_vote_cate_4_off.png");
		$("#sort_image5").attr("src","images/btn_vote_cate_5_off.png");
	}else if (param == "2"){
		$("#sort_image0").attr("src","images/btn_vote_cate_all_off.png");
		$("#sort_image1").attr("src","images/btn_vote_cate_1_off.png");
		$("#sort_image2").attr("src","images/btn_vote_cate_2_on.png");
		$("#sort_image3").attr("src","images/btn_vote_cate_3_off.png");
		$("#sort_image4").attr("src","images/btn_vote_cate_4_off.png");
		$("#sort_image5").attr("src","images/btn_vote_cate_5_off.png");
	}else if (param == "3"){
		$("#sort_image0").attr("src","images/btn_vote_cate_all_off.png");
		$("#sort_image1").attr("src","images/btn_vote_cate_1_off.png");
		$("#sort_image2").attr("src","images/btn_vote_cate_2_off.png");
		$("#sort_image3").attr("src","images/btn_vote_cate_3_on.png");
		$("#sort_image4").attr("src","images/btn_vote_cate_4_off.png");
		$("#sort_image5").attr("src","images/btn_vote_cate_5_off.png");
	}else if (param == "4"){
		$("#sort_image0").attr("src","images/btn_vote_cate_all_off.png");
		$("#sort_image1").attr("src","images/btn_vote_cate_1_off.png");
		$("#sort_image2").attr("src","images/btn_vote_cate_2_off.png");
		$("#sort_image3").attr("src","images/btn_vote_cate_3_off.png");
		$("#sort_image4").attr("src","images/btn_vote_cate_4_on.png");
		$("#sort_image5").attr("src","images/btn_vote_cate_5_off.png");
	}else if (param == "5"){
		$("#sort_image0").attr("src","images/btn_vote_cate_all_off.png");
		$("#sort_image1").attr("src","images/btn_vote_cate_1_off.png");
		$("#sort_image2").attr("src","images/btn_vote_cate_2_off.png");
		$("#sort_image3").attr("src","images/btn_vote_cate_3_off.png");
		$("#sort_image4").attr("src","images/btn_vote_cate_4_off.png");
		$("#sort_image5").attr("src","images/btn_vote_cate_5_on.png");
	}
	vote_sort	= param;

	$.ajax({
		type:"POST",
		data:{
			"vote_param"		: param
		},
		url: "./ajax_list.php",
		success: function(response){
			$(".sec_list").html(response);
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
			//$(".sear_gift_list").show();
			//$(".sear_gift_btn").show();
			//$(".sear_no_gift_list").hide();
			//$(".sear_no_gift_btn").hide();
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

function back_input(param)
{
	if (param == "nominee")
	{
		$.colorbox({width:"542px", height:"542px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#reg_input_popup", onComplete: function(){
			$("#cboxLoadedContent").height(500);
			$("#cboxContent").css("background","none");
		},
		onClosed: function(){
			del_info();
		}});
	}else{
		$.colorbox({width:"542px", height:"542px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#vote_input_popup", onComplete: function(){
			$("#cboxLoadedContent").height(500);
			$("#cboxContent").css("background","none");
		},
		onClosed: function(){
			del_info();
		}});
	}
}

function nominee_search()
{
	$.colorbox({width:"542px", height:"342px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#nominee_search_popup", onComplete: function(){
		$("#cboxLoadedContent").height(300);
		$("#cboxContent").css("background","none");
	},
	onClosed: function(){
		del_info();
	}});
}

function offline_info()
{
	$.colorbox({width:"542px", height:"682px", inline:true, opacity:"0.9", scrolling:false, closeButton:false, overlayClose: false, fadeOut: 300, href:"#offline_popup", onComplete: function(){
		$("#cboxLoadedContent").height(640);
		$("#cboxContent").css("background","none");
	},
	onClosed: function(){
		del_info();
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
		$("#tab_upload_image1").attr("src","images/popup/btn_upload_pic_on.png");
		$("#tab_upload_image2").attr("src","images/popup/btn_upload_movie_off.png");
		$("#mov_input_area").hide();
		$("#pic_input_area").show();
	}else{
		$("#tab_upload_image1").attr("src","images/popup/btn_upload_pic_off.png");
		$("#tab_upload_image2").attr("src","images/popup/btn_upload_movie_on.png");
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
	$("#files").html('<img src="images/popup/pre_img.jpg" />');
	$("#search_baby_name").val("");
	$(".p_mid_view").height("");
	$(".p_position").height("");
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
