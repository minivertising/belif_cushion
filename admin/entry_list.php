<?php

	// 설정파일
	include_once "../config.php";

/*
	if (isset($_SESSION['ss_mb_id']) == false)
	{
		//header('Location: index.php'); 
		echo "<script>location.href='index.php'</script>"; 
		exit; 
	}
*/

	include "./head.php";

	if(isset($_REQUEST['search_type']) == false)
		$search_type = "";
	else
		$search_type = $_REQUEST['search_type'];

	if(isset($_REQUEST['search_txt']) == false)
		$search_txt	= "";
	else
		$search_txt	= $_REQUEST['search_txt'];

	if(isset($_REQUEST['sDate']) == false)
		$sDate = "";
	else
		$sDate = $_REQUEST['sDate'];
	
	if(isset($_REQUEST['eDate']) == false)
		$eDate = "";
	else
		$eDate = $_REQUEST['eDate'];

	
	if(isset($_REQUEST['pg']) == false)
		$pg = "1";
	else
		$pg = $_REQUEST['pg'];
	
	if (!$pg)
		$pg = "1";
	//if(isset($pg) == false) $pg = 1;	// $pg가 없으면 1로 생성
	$page_size = 10;	// 한 페이지에 나타날 개수
	$block_size = 10;	// 한 화면에 나타낼 페이지 번호 개수

	//if (isset($search_type) == false)
	//	$search_type = "search_by_name";
?>
<script type="text/javascript">
	$(function() {
		$( "#sDate" ).datepicker();
		$( "#eDate" ).datepicker();
	});

	function checkfrm()
	{
		if ($("#sDate").val() > $("#eDate").val())
		{
			alert("검색 시작일은 종료일보다 작아야 합니다.");
			return false;
		}
	}
</script>

<div id="page-wrapper">
  <div class="container-fluid">
  <!-- Page Heading -->
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">이벤트 참여자 목록</h1>
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="table-responsive">
          <ol class="breadcrumb">
            <form name="frm_execute" method="POST" onsubmit="return checkfrm()">
              <input type="hidden" name="pg" value="<?=$pg?>">
              <select name="search_type">
                <option value="mb_name" <?php if($search_type == "mb_name"){?>selected<?php }?>>이름</option>
                <option value="mb_phone" <?php if($search_type == "mb_phone"){?>selected<?php }?>>전화번호</option>
              </select>
              <input type="text" name="search_txt" value="<?php echo $search_txt?>">
              <input type="text" id="sDate" name="sDate" value="<?=$sDate?>"> - <input type="text" id="eDate" name="eDate" value="<?=$eDate?>">
              <input type="submit" value="검색">
			  <li align="right";>
			  <?
					$member = "SELECT count(idx) FROM ".$_gl['member_info_table']." WHERE mb_name <> 'admin' ";
					$res3 = mysqli_query($my_db, $member);
					list($total_count)	= @mysqli_fetch_array($res3);
					echo  "전체 참여자수 : $total_count";
				?>
			</li>
            </form>
          </ol>
          <table id="entry_list" class="table table-hover">
            <thead>
              <tr>
                <th>순번</th>
                <th>IP주소</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>후보지원항목</th>
                <th>아기 이름</th>
                <th>아기 개월수</th>
                <th>업로드 구분</th>
                <th>업로드 URL</th>
                <th>당첨 선물</th>
                <th>득표수</th>
                <th>난수번호</th>
                <th>유입매체</th>
                <th>구분</th>
                <th>참여일자</th>
              </tr>
            </thead>
            <tbody>
<?php 
	$where = "";

	if ($sDate != "")
		$where	.= " AND mb_regdate >= '".$sDate."' AND mb_regdate <= '".$eDate." 23:59:59'";
	
	if ($search_txt != "")
	{
		$where	.= " AND ".$search_type." like '%".$search_txt."%'";
	}
	$buyer_count_query = "SELECT count(*) FROM ".$_gl['member_info_table']." WHERE mb_name <> 'admin' ".$where."";

	list($buyer_count) = @mysqli_fetch_array(mysqli_query($my_db, $buyer_count_query));
	$PAGE_CLASS = new Page($pg,$buyer_count,$page_size,$block_size);

	$BLOCK_LIST = $PAGE_CLASS->blockList();
	$PAGE_UNCOUNT = $PAGE_CLASS->page_uncount;
	$buyer_list_query = "SELECT * FROM ".$_gl['member_info_table']." WHERE mb_name <> 'admin' ".$where." Order by idx DESC LIMIT $PAGE_CLASS->page_start, $page_size";

	$res = mysqli_query($my_db, $buyer_list_query);

	while ($buyer_data = @mysqli_fetch_array($res))
	{
		$buyer_info[] = $buyer_data; 
	}

	foreach($buyer_info as $key => $val)
	{
		if ($buyer_info[$key]['mb_sel_nominees'] == "1")
			$sel_nominees	= "심쿵미소 연기상";
		else if ($buyer_info[$key]['mb_sel_nominees'] == "2")
			$sel_nominees	= "혼신의 눈물 연기상";
		else if ($buyer_info[$key]['mb_sel_nominees'] == "3")
			$sel_nominees	= "코믹 표정 연기상";
		else if ($buyer_info[$key]['mb_sel_nominees'] == "4")
			$sel_nominees	= "베비언스 먹방상";
		else if ($buyer_info[$key]['mb_sel_nominees'] == "5")
			$sel_nominees	= "폭풍숙면 연기상";

		if ($buyer_info[$key]['mb_upload_flag'] == "P")
			$upload_flag		= "사진";
		else
			$upload_flag		= "영상";

		if ($buyer_info[$key]['mb_winner']	= "Y")
			$winner	= "배송쿠폰";
		else
			$winner	= "할인쿠폰";
?>
              <tr>
                <td><?php echo $PAGE_UNCOUNT--?></td>	<!-- No. 하나씩 감소 -->
                <td><?php echo $buyer_info[$key]['mb_ipaddr']?></td>
                <td><?php echo $buyer_info[$key]['mb_name']?></td>
                <td><?php echo $buyer_info[$key]['mb_phone']?></td>
                <td><?php echo $sel_nominees?></td>
                <td><?php echo $buyer_info[$key]['mb_baby_name']?></td>
                <td><?php echo $buyer_info[$key]['mb_baby_month']?></td>
                <td><?php echo $upload_flag?></td>
                <td><?php echo $buyer_info[$key]['mb_upload_url']?></td>
                <td><?php echo $winner?></td>
                <td><?php echo number_format($buyer_info[$key]['mb_vote'])?></td>
                <td><?php echo $buyer_info[$key]['mb_serial']?></td>
                <td><?php echo $buyer_info[$key]['mb_media']?></td>
                <td><?php echo $buyer_info[$key]['mb_gubun']?></td>
                <td><?php echo $buyer_info[$key]['mb_regdate']?></td>
              </tr>
<?php 
	}
?>
              <tr><td colspan="10"><div class="pageing"><?php echo $BLOCK_LIST?></div></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /#page-wrapper -->
</div>
<!-- /#wrapper -->
</body>

</html>



<script type="text/javascript">
 
	function pageRun(num)
	{
		f = document.frm_execute;
		f.pg.value = num;
		f.submit();
	}


</script>