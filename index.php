<?
	include_once "config.php";

	//unset($media);
	$media	= $_REQUEST['media'];
	$testurl	= $_REQUEST['testurl'];
	$tab	= $_REQUEST['tab'];

	$_SESSION['ss_media'] = $media;
	$_SESSION['ss_testurl'] = $testurl;

	BR_InsertTrackingInfo($media, $gubun);

	if($gubun == "MOBILE")
	{
		if ($tab)
			Header("Location:http://www.belif-factory.com/MOBILE/index.php?tab=".$tab."");
		else
			Header("Location:http://www.belif-factory.com/MOBILE/index.php");
		exit;
	}else{
		if ($tab)
			Header("Location:http://www.belif-factory.com/PC/index.php?tab=".$tab."");
		else
			Header("Location:http://www.belif-factory.com/PC/index.php");
		exit;
	}

?>
