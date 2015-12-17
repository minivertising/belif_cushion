<?
	include_once   "./header.php";
?>
<body>
    <!-- <div id="mobile_menu" class="mobile_menu">
      <ul>
      	<li><a href="#">빌리프 수분 폭탄 공장 이벤트 참여</a></li>
        <li><a href="#">빌리프 수분 폭탄 쿠션 제품 소개</a></li>
        <li><a href="#" onclick="open_pop('gift_popup');">선물 보기</a></li>
        <li><a href="#" onclick="open_pop('use_popup');">참여 방법</a></li>
        <li><a href="#" onclick="open_pop('notice_popup');">유의 사항</a></li>
        <li><a href="#">빌리프 SHOP</a></li>
        <li><a href="#">빌리프 카카오플러스 친구 맺기</a></li>
      </ul>
      <div class="btn_sns">
        <div class="inner_sns clearfix">
          <a href="#" onclick="sns_share('kt');" id="kakao-link-btn">KT</a>
          <a href="#" onclick="sns_share('ks');">KS</a>
          <a href="#" onclick="sns_share('fb');">FB</a>
          <a href="#" onclick="sns_share('tw');">TW</a>
        </div>
      </div>
    </div> -->

<div id="mobile_menu" class="wrap_pop_menu mobile_menu">
  <div class="close_menu">
    <a href="#" id="m_menu_close"><img src="images/btn_close_menu.png" alt=""/></a>
  </div>
  <div class="pop_btn_menu">
    <div>
      <a href="#"><img src="images/title_pop_menu.jpg" alt=""/></a>
    </div>
    <div>
      <a href="#"><img src="images/btn_product.jpg" alt=""/></a>
    </div>
    <div>
      <a href="#" onclick="open_pop('gift_popup');"><img src="images/btn_gift.jpg" alt=""/></a>
    </div>
    <div>
      <a href="#"><img src="images/btn_howto.jpg" alt=""/></a>
    </div>
    <div class="btn_out clearfix">
      <a href="#"><img src="images/btn_event_notice.png" alt=""/></a>
      <a href="#"><img src="images/btn_shop.png" alt=""/></a>
    </div>
    <div>
      <a href="#"><img src="images/btn_kt_friends.jpg" alt=""/></a>
    </div>
    <div class="btn_sns_block">
      <div class="inner_btn_sns_block clearfix">
        <a href="#"><img src="images/btn_fb.png" alt=""/></a>
        <a href="#"><img src="images/btn_kt.png" alt=""/></a>
        <a href="#"><img src="images/btn_ks.png" alt=""/></a>
        <a href="#"><img src="images/btn_tw.png" alt=""/></a>
      </div>
    </div>
  </div>
</div>

<div class="sec_top">
  <div class="inner_sec_top clearfix">
    <div class="logo"><a href="#"><img src="images/logo.png" alt=""/></a></div>
    <!-- <div class="menu"><a href="#" onclick="show_menu();return false;"><img src="images/menu_ham.png" width="95" alt=""/></a></div> -->
    <div class="menu gnbBtn"><a href="#"><img src="images/menu_ham.png" width="95" alt=""/></a></div>
  </div>
</div>

<div class="sec_main_img">
  <a href="game.php" class="btn_sear"><img src="images/btn_sear_billy.png" alt=""/></a>
  <div class="bg"><img src="images/bg_main_img.jpg" alt=""/></div>
</div>

<?
	include_once   "./popup_div.php";
?>
<div class="mask"></div>
</body>
</html>
<script type="text/javascript">
$(document).ready(function() {
	//Kakao.init('f3a512c4931967328de52deaf00f614e');
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