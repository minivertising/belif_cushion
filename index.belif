<?
	include_once "config.belif";

	//unset($media);
	$media	= $_REQUEST['media'];
	$testurl	= $_REQUEST['testurl'];
	$tab	= $_REQUEST['tab'];

	$_SESSION['ss_media'] = $media;
	$_SESSION['ss_testurl'] = $testurl;

	BR_InsertTrackingInfo($media, $gubun);

	if($gubun == "MOBILE")
	{
		Header("Location:http://www.belif-factory.com/MOBILE/index.belif?media=".$media."");
		exit;
	}else{
		Header("Location:http://www.belif-factory.com/PC/index.belif?media=".$media."");
		exit;
	}

?>
