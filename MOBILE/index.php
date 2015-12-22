<?
	include_once   "./header.php";
?>
<body>
<div id="mobile_menu" class="wrap_pop_menu mobile_menu">
  <div class="close_menu">
    <a href="#" id="m_menu_close"><img src="images/btn_close_menu.png" alt=""/></a>
  </div>
  <div class="pop_btn_menu">
    <div>
      <a href="game.php" id="m_event_show"><img src="images/title_pop_menu.jpg" alt=""/></a>
    </div>
    <div>
      <a href="#" onclick="move_page('product');return false;"><img src="images/btn_product.jpg" alt=""/></a>
    </div>
    <div>
      <a href="#" onclick="open_pop('gift_popup');"><img src="images/btn_gift.jpg" alt=""/></a>
    </div>
    <div>
      <a href="#" onclick="open_pop('use_popup');"><img src="images/btn_howto.jpg" alt=""/></a>
    </div>
    <div class="btn_out clearfix">
      <a href="#" onclick="open_pop('notice_popup');"><img src="images/btn_event_notice.png" alt=""/></a>
      <a href="http://m.lotte.com/product/m/product_view.do?goods_no=182036536" target="_blank"><img src="images/btn_shop.png" alt=""/></a>
    </div>
    <div>
      <a href="http://plus.kakao.com/home/@빌리프" target="_blank"><img src="images/btn_kt_friends.jpg" alt=""/></a>
    </div>
    <div class="btn_sns_block">
      <div class="inner_btn_sns_block clearfix">
        <a href="#" onclick="sns_share('fb','main');return false;"><img src="images/btn_fb.png" alt=""/></a>
        <a href="#" onclick="sns_share('kt','main');return false;"><img src="images/btn_kt.png" alt=""/></a>
        <a href="#" onclick="sns_share('ks','main');return false;"><img src="images/btn_ks.png" alt=""/></a>
        <a href="#" onclick="sns_share('tw','main');return false;"><img src="images/btn_tw.png" alt=""/></a>
      </div>
    </div>
  </div>
</div>

<div class="sec_top">
  <div class="inner_sec_top clearfix">
    <div class="logo"><a href="index.php"><img src="images/logo.png" alt=""/></a></div>
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
	Kakao.init('82ede71bb1ebb8db5c131f7de027edc1');
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