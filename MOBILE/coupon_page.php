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
        </div>
        <div class="coupon_text">
            <p>교환 가능 매장 : <?=$shop_data['shop_name']?></p>
            <p>기간 : 12월 00일 ~ 12월 00일</p>
            <p>* 본 쿠폰은 1인 1매 사용 가능합니다.</p>
        </div>
        <div class="coupon bg">
<?
	if ($mb_data['mb_use'] == "N")
	{
?>
        	<a href="#" onclick="use_coupon('<?=$mb_phone?>');return false;"><img src="images/btn_coupon.png" alt=""/></a>
<?
	}else{
?>
        	<a href="#"><img src="images/btn_coupon_02.png" alt=""/></a>
<?
	}
?>
        </div>
    	<div class="bg"><img src="images/bg_coupon.jpg" alt=""/></div>
    </div>
</body>
</html>
