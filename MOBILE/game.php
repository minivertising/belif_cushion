<?
	include_once   "./header.php";
?>
<body>
<div class="wrap_game_bg">
  <div class="sec_sub_img">
    <div class="close"><a href="index.php"><img src="images/btn_close.png" width="35" alt=""/></a></div>
    <div class="game">
      <div class="inner_game">
        <div class="step bg" id="step_div"><img src="images/step_1.png" alt="" id="step_image" /></div>
        <div class="txts clearfix" id="sec_div">
          <div class="txt"><img src="images/txt_time_limit.png" width="240" alt=""/></div>
          <div class="time">26<span>초</span></div>
        </div>
        <div class="bar" id="bar_div">
          <div class="inner_bar">
            <div class="blue" style="width:0%">
            </div>
          </div>
        </div>

        <!--첫번째 그림시작-->
        <div class="game_img start" id="game1_div">
          <div class="bg">
            <a href="#" onclick="start_game();return false;"><img src="images/game_img_1_1.png" alt=""/></a>
          </div>
        </div>

        <!--첫번째 그림찾기-->
        <div class="game_img after" id="game2_div" style="display:none;">
          <div class="btn_billy step_1" onclick="right_answer('1');">
            <a href="#">빌리</a>
          </div>
          <div id="game2_circle" style="position:absolute;top:66%;left:22%;display:none;">
            <img src="images/right_circle.png" style="width:45px;height:45px;"/>
          </div>
          <div class="bg" onclick="open_pop('wrong_popup');">
            <img src="images/game_img_1_2.png" alt=""/>
          </div>
        </div> 
        <!--두번째 그림찾기-->
        <div class="game_img after" id="game3_div" style="display:none;">
          <div class="btn_billy step_1" onclick="right_answer('2');">
            <a href="#">빌리</a>
          </div>
          <div id="game3_circle" style="position:absolute;top:66%;left:22%;display:none;">
            <img src="images/right_circle.png" style="width:45px;height:45px;"/>
          </div>
          <div class="bg" onclick="open_pop('wrong_popup');">
            <img src="images/game_img_2_2.png" alt=""/>
          </div>
        </div> 
        <!--세번째 그림찾기-->
        <div class="game_img after" id="game4_div" style="display:none;">
          <div class="btn_billy step_1" onclick="right_answer('3');">
            <a href="#">빌리</a>
          </div>
          <div id="game4_circle" style="position:absolute;top:66%;left:22%;display:none;">
            <img src="images/right_circle.png" style="width:45px;height:45px;"/>
          </div>
          <div class="bg" onclick="open_pop('wrong_popup');">
            <img src="images/game_img_3_2.png" alt=""/>
          </div>
        </div> 
      </div>
    </div>
    <div class="input_info" id="game5_div" style="display:none;">
      <div class="inner_input_info">
        <div class="input"><input type="text" id="mb_name"></div>
        <div class="input phone"><input type="tel" id="mb_phone" placeholder="숫자만 입력하세요" onkeyup="only_num(this);chk_len3(this.value);return false;"></div>
        <div class="select_area">
          <select id="mb_addr" onchange="change_addr(this)">
            <option value="">선택하세요</option>
            <option value="1">서울특별시</option>
            <option value="2">부산광역시</option>
            <option value="3">대구광역시</option>
            <option value="4">인천광역시</option>
            <option value="5">광주광역시</option>
            <option value="6">대전광역시</option>
            <option value="7">울산광역시</option>
            <option value="8">경기도</option>
            <option value="9">충청북도</option>
            <option value="10">충청남도</option>
            <option value="11">전라북도</option>
            <option value="12">전라남도</option>
            <option value="13">경상북도</option>
            <option value="14">경상남도</option>
            <option value="15">제주특별자치도</option>
          </select>
        </div>
        <div class="select_store">
          <select id="mb_shop">
            <option value="">선택하세요</option>
          </select>
        </div>
        <div class="check"><a href="#"><img src="images/check.png" alt="" name="mb_agree" id="mb_agree" onclick="mb_check();return false;"/></a></div>
        <div class="txt_detail" onclick="mb_check();return false;">개인정보 수집 및 위탁에 관한 동의</div>
        <div class="btn_detail"><a href="#" onclick="open_pop('agree_popup');return false;"><img src="images/btn_detail.png" alt=""/></a></div>
        <div class="btn_input"><a href="#" onclick="ins_info();return false;"><img src="images/btn_input.png" alt=""/></a></div>
        <div class="bg">
          <img src="images/bg_input.png" alt=""/>
        </div>
      </div>
    </div>
    <div class="thanks bg" id="game6_div" style="display:none;">
      <a href="index.php"><img src="images/bg_thanks.png" alt=""/></a>
    </div>
  </div>
</div>

<?
	include_once   "./popup_div.php";
?>
<div class="mask"></div>
</body>
</html>
<script type="text/javascript">
var scroll_control1	= null;
var chk_mb_flag	= 0;

$(document).ready(function() {
	//Kakao.init('f3a512c4931967328de52deaf00f614e');01065200385
	$("#cboxTopLeft").hide();
	$("#cboxTopRight").hide();
	$("#cboxBottomLeft").hide();
	$("#cboxBottomRight").hide();
	$("#cboxMiddleLeft").hide();
	$("#cboxMiddleRight").hide();
	$("#cboxTopCenter").hide();
	$("#cboxBottomCenter").hide();
	scroll_control1	= ($(".game").height() + $(".close").height()) - $(window).height();
	//$("#scroll_area").height($(".game").height());
});
/*
$(window).scroll(function() {
	if ($(window).scrollTop() > scroll_control1)
	{
		$("body").bind('touchmove', function(e){e.preventDefault()}); //스크롤방지
	}else{
		$("body").unbind('touchmove'); //스크롤 시작
	}
});
*/
</script>