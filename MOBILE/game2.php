<?
	include_once   "./header.php";
?>
<body>
<div id="game1_div" style="width:100%;height:100%">
  <a href="#" onclick="start_game();return false;">게임 START!!</a>
</div>
<div id="game2_div" style="display:none;width:100%;height:100%">
  <h3>게임 1페이지</h3>
  <a href="#" onclick="right_answer('1');">정답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
</div>
<div id="game3_div" style="position:absolute;display:none;width:100%;height:100%">
  <h3>게임 2페이지</h3>
  <a href="#" onclick="right_answer('2');">정답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
</div>
<div id="game4_div" style="display:none;width:100%;height:100%">
  <h3>게임 3페이지</h3>
  <a href="#" onclick="right_answer('3');">정답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
  <a href="#" onclick="open_pop('wrong_popup');">오답</a>
</div>
<div id="game_timer" style="display:none;">
  <span id="timer"></span>
</div>
<div id="game5_div" style="display:none;;width:100%;height:100%">
  이름 : <input type="text" name="mb_name" id="mb_name"><br />
  전화번호 : 
  <select name="mb_phone1" id="mb_phone1">
    <option name="010">010</option>
    <option name="011">011</option>
    <option name="016">016</option>
    <option name="017">017</option>
    <option name="018">018</option>
    <option name="019">019</option>
  </select>
  <input type="text" name="mb_phone2" id="mb_phone2" onkeyup="only_num(this);chk_len(this.value);"><br />
  <input type="text" name="mb_phone3" id="mb_phone3" onkeyup="only_num(this);chk_len2(this.value);"><br />
  샘플수령매장 : 
  <select name="mb_addr" id="mb_addr" onchange="change_addr(this)">
    <option name="">선택하세요</option>
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
  <select name="mb_shop" id="mb_shop">
    <option name="">선택하세요</option>
  </select><br />
  <input type="checkbox" name="mb_agree" id="mb_agree"> 개인정보 수집 및 위탁에 관한 동의 <a href="#">자세히보기</a><br />
  <a href="#" onclick="ins_info();return false;">입력 완료</a>
</div>
<?
	include_once   "./popup_div.php";
?>
<div class="mask"></div>
</body>
</html>
<script type="text/javascript">
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
});

</script>