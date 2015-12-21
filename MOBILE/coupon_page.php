<?
	include_once   "./header.php";
	$mb_phone	= $_REQUEST['mid'];

	$mb_query		= "SELECT * FROM ".$_gl['member_info_table']." WHERE mb_phone='".$mb_phone."'";
	$mb_result		= mysqli_query($my_db, $mb_query);
	$mb_data		= mysqli_fetch_array($mb_result);

	if (!$mb_data)
	{
		print_r("고객님의 쿠폰 정보가 없습니다.");
		exit;
	}
	$shop_query		= "SELECT * FROM ".$_gl['shop_info_table']." WHERE idx='".$mb_data['mb_shop']."'";
	$shop_result		= mysqli_query($my_db, $shop_query);
	$shop_data		= mysqli_fetch_array($shop_result);

?>
<body>
<div class="sec_sub_coupon">
  <div class="thanks bg">
    <img src="images/img_coupon.png" alt=""/>
    <img src="images/coupon_text.png" alt=""/>
  </div>
  <div class="coupon_text"><?=$shop_data['shop_name']?></div>
  <div class="coupon bg">
    <a href="#" onclick="use_coupon('<?=$mb_phone?>');return false;"><img src="images/btn_coupon.png" alt=""/></a>
  </div>
  <div class="bg"><img src="images/bg_coupon.jpg" alt=""/></div>
</div>
</body>
</html>
