<?
	include_once   "./header.php";
?>
<body>
<div id="scroll_area" style="position:absolute;width:100%;z-index:1">
</div>
<div class="sec_sub_img">
  <div class="close"><a href="#"><img src="images/btn_close.png" width="35" alt=""/></a></div>
  <div class="game">
    <div class="inner_game">
      <div class="step bg"><img src="images/step_1.png" alt=""/></div>
      <div class="txts clearfix">
        <div class="txt"><img src="images/txt_time_limit.png" width="240" alt=""/></div>
        <div class="time">26<span>초</span></div>
      </div>
      <div class="bar">
        <div class="inner_bar">
          <div class="blue">
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
        <div class="btn_billy step_1">
          <a href="#">빌리</a>
        </div>
        <div class="bg">
          <img src="images/game_img_1_2.png" alt=""/>
        </div>
      </div> 

    </div>
  </div>
  <div class="input_info">
    <div class="inner_input_info">
      <div class="input"><input type="text"></div>
      <div class="input phone"><input type="text" value="-없이 번호만 적어주세요"></div>
      <div class="select_area">
        <select>
          <option value="text1">text1</option>
        </select>
      </div>
      <div class="select_store">
        <select>
          <option value="text1">text1</option>
        </select>
      </div>
      <div class="check"><a href="#"><img src="images/checked.png" alt=""/></a></div>
      <div class="btn_detail"><a href="#"><img src="images/btn_detail.png" alt=""/></a></div>
      <div class="btn_input"><a href="#"><img src="images/btn_input.png" alt=""/></a></div>
      <div class="bg">
        <img src="images/bg_input.png" alt=""/>
      </div>
    </div>
  </div>
  <div class="thanks bg">
    <a href="#"><img src="images/bg_thanks.png" alt=""/></a>
  </div>
  <div class="bg"><img src="images/bg_sub_game.jpg" alt=""/></div>
</div>

<?
	include_once   "./popup_div.php";
?>
<div class="mask"></div>
</body>
</html>
<script type="text/javascript">
var scroll_control1	= null;
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