<?
	include_once "../include/global.php"; 			//변수정보
	include_once "../include/function.php"; 		//함수정보
	include_once "../include/dbi.php"; 			//DB 연결정보
	mysqli_query ($my_db,"set names utf8");

	$addr_idx		= $_REQUEST['addr_idx'];
	// 주소 쿼리
	$query 		= "SELECT * FROM ".$_gl['shop_info_table']." WHERE addr_idx='".$addr_idx."'";
	$result 	= mysqli_query($my_db, $query);

	while($addr_data = mysqli_fetch_array($result))
	{
?>
      <option value="<?=$addr_data['idx']?>"><?=$addr_data['shop_name']?></option>
<?
	}
?>
