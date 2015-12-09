<?
	// 유입매체 정보 입력
	function BR_InsertTrackingInfo($media, $gubun)
	{
		global $_gl;
		global $my_db;

		$query		= "INSERT INTO ".$_gl['tracking_info_table']."(tracking_media, tracking_refferer, tracking_ipaddr, tracking_date, tracking_gubun) values('".$media."','".$_SERVER['HTTP_REFERER']."','".$_SERVER['REMOTE_ADDR']."',now(),'".$gubun."')";
		$result		= mysqli_query($my_db, $query);
	}

	function BA_winner_draw($mb_phone)
	{
		global $_gl;
		global $my_db;

		$water_winner		= 30;	// 베이비 워터 1박스
		$skin_winner			= 30;	// 스킨케어 2종 세트(로션+워시)
		$clean_winner		= 30;	// 클린 4종세트(세제섬유유연제용기+리필
		$delivery_winner	= 50000;	// 무료 배송 쿠폰
		$discount_winner	= 50000;	// 3천원 할인 쿠폰

		$water_array = array(200000);
		$skin_array = array(200000);
		$clean_array = array(200000);
		$delivery_array = array(200000);
		$discount_array = array(200000);
		$delivery_array = array("Y","N");
		$discount_array = array("Y","N");

		// 오늘의 이벤트 참여자 수 구하기
		$total_query		= "SELECT * FROM ".$_gl['voter_info_table']." WHERE vote_regdate like '%".date("Y-m-d")."%'";
		$total_result		= mysqli_query($my_db, $total_query);
		$total_num		= mysqli_num_rows($total_result);

		// 중복 당첨 체크
		$dupli_query		= "SELECT * FROM ".$_gl['voter_info_table']." WHERE vote_phone='".$mb_phone."' AND vote_winner like '%Y%'";
		$dupli_result		= mysqli_query($my_db, $dupli_query);
		$dupli_num		= mysqli_num_rows($dupli_result);

		// 중복 참여자 체크
		$dupli0_query		= "SELECT * FROM ".$_gl['voter_info_table']." WHERE vote_phone='".$mb_phone."'";
		$dupli0_result		= mysqli_query($my_db, $dupli0_query);
		$dupli0_num		= mysqli_num_rows($dupli0_result);
		
		// 후보자 중복 참여자 체크
		$dupli1_query		= "SELECT * FROM ".$_gl['member_info_table']." WHERE mb_phone='".$mb_phone."'";
		$dupli1_result		= mysqli_query($my_db, $dupli1_query);
		$dupli1_num		= mysqli_num_rows($dupli1_result);

		// 배송비 중복 당첨여부 체크
		$dupli_bann_query		= "SELECT * FROM ".$_gl['bann_info_table']." WHERE bann_phone='".$mb_phone."'";
		$dupli_bann_result		= mysqli_query($my_db, $dupli_bann_query);
		$dupli_bann_num		= mysqli_num_rows($dupli_bann_result);

		if ($dupli_num > 0)
		{
			$winner = "N||DISCOUNT";
		}else{
			$winner = "N||DISCOUNT";
			if ($dupli0_num == 0)
			{
				if ($dupli_bann_num == 0 || $dupli1_num == 0)
					$winner = "N||DELIVERY";
				else
					$winner = "N||DISCOUNT";
			}

			if ($winner != "N||DELIVERY")
			{
				if ($dupli0_num < 3)
				{
					$winner = "N||DISCOUNT";
				}else{
					foreach ($water_array as $key => $val)
					{
						if ($total_num == $val)
						{
							$winner = "Y||WATER";
							break;
						}
						$winner = "N||DISCOUNT";
							//$winner = "Y||WATER";
					}

					foreach ($skin_array as $key => $val)
					{
						if ($total_num == $val)
						{
							$winner = "Y||SKIN";
							break;
						}
						$winner = "N||DISCOUNT";
							//$winner = "Y||WATER";
					}

					foreach ($clean_array as $key => $val)
					{
						if ($total_num == $val)
						{
							$winner = "Y||CLEAN";
							break;
						}
						$winner = "N||DISCOUNT";
							//$winner = "Y||WATER";
					}
				}
			}
		}
		return $winner;
	}



	function BA_getSerial($gift)
	{
		global $_gl;
		global $my_db;

		$query		= "SELECT serial_code FROM ".$_gl['serial_info_table']." WHERE gift='".$gift."' AND useYN='N' limit 1";
		$result		= mysqli_query($my_db, $query);
		$data			= mysqli_fetch_array($result);

		$query2		= "UPDATE ".$_gl['serial_info_table']." SET useYN='Y' WHERE serial_code='".$data[serial_code]."'";
		$result2		= mysqli_query($my_db, $query2);

		return $data['serial_code'];
	}

	// LMS 발송 
	function send_lms($phone, $serial)
	{
		global $_gl;
		global $my_db;

		$s_url		= "http://awards.babience-event.com/MOBILE/coupon_page.php?mid=".$phone;
		$httpmethod = "POST";
		$url = "http://api.openapi.io/ppurio/1/message/lms/minivertising";
		$clientKey = "MTAyMC0xMzg3MzUwNzE3NTQ3LWNlMTU4OTRiLTc4MGItNDQ4MS05NTg5LTRiNzgwYjM0ODEyYw==";
		$contentType = "Content-Type: application/x-www-form-urlencoded";

		$query = "SELECT * FROM sms_info WHERE send_phone='".$phone."'";
		$result 		= mysqli_query($my_db, $query);
		$dupli_num	= mysqli_num_rows($result);

		if ($dupli_num == 0)
		{
			$response = sendRequest($httpmethod, $url, $clientKey, $contentType, $phone, $s_url);

			$json_data = json_decode($response, true);

			/*
			받아온 결과값을 DB에 저장 및 Variation
			*/
			$query3 = "INSERT INTO sms_info(send_phone, send_status, cmid, send_regdate) values('".$phone."','".$json_data['result_code']."','".$json_data['cmid']."','".date("Y-m-d H:i:s")."')";
			$result3 		= mysqli_query($my_db, $query3);

			$query2 = "UPDATE member_info SET mb_lms='Y' WHERE mb_phone='".$phone."'";
			$result2 		= mysqli_query($my_db, $query2);

			if ($json_data['result_code'] == "200")
				$flag = "Y";
			else
				$flag = "N";
		}else{
			$flag	= "N";
		}

		return $flag;
	}

	// 달력이벤트 LMS 발송 
	function send_lms_calendar()
	{
		global $_gl;
		global $my_db;

		$httpmethod = "POST";
		$url = "http://api.openapi.io/ppurio/1/message/lms/minivertising";
		$clientKey = "MTAyMC0xMzg3MzUwNzE3NTQ3LWNlMTU4OTRiLTc4MGItNDQ4MS05NTg5LTRiNzgwYjM0ODEyYw==";
		$contentType = "Content-Type: application/x-www-form-urlencoded";

		$query = "SELECT mb_phone, mb_serial FROM calendar_info WHERE mb_phone='01047768370'";
		$result 		= mysqli_query($my_db, $query);
		while ($data	= mysqli_fetch_array($result))
		{
			$phone		= $data['mb_phone'];
			$serial		= $data['mb_serial'];
			$response = sendRequest_calendar($httpmethod, $url, $clientKey, $contentType, $phone, $serial);
			$json_data = json_decode($response, true);
			print_r($json_data);
			/*
			받아온 결과값을 DB에 저장 및 Variation
			*/
			$query3 = "INSERT INTO sms_info(send_phone, send_status, cmid, send_regdate) values('".$phone."','".$json_data['result_code']."','".$json_data['cmid']."','".date("Y-m-d H:i:s")."')";
			$result3 		= mysqli_query($my_db, $query3);

			$query2 = "UPDATE calendar_info SET mb_lms='Y' WHERE mb_phone='".$phone."'";
			$result2 		= mysqli_query($my_db, $query2);
		}

		if ($json_data['result_code'] == "200")
			$flag = "Y";
		else
			$flag = "N";

		return $flag;
	}

	// 베비언스 오프라인 안내 LMS 발송 
	function send_lms_offline($phone)
	{
		global $_gl;
		global $my_db;

		$httpmethod = "POST";
		$url = "http://api.openapi.io/ppurio/1/message/lms/minivertising";
		$clientKey = "MTAyMC0xMzg3MzUwNzE3NTQ3LWNlMTU4OTRiLTc4MGItNDQ4MS05NTg5LTRiNzgwYjM0ODEyYw==";
		$contentType = "Content-Type: application/x-www-form-urlencoded";

		//$query = "SELECT mb_phone, mb_serial FROM calendar_info WHERE mb_phone='01032751346'";
		//$result 		= mysqli_query($my_db, $query);
		//while ($data	= mysqli_fetch_array($result))
		//{
			//$phone		= $data['mb_phone'];
			//$serial		= $data['mb_serial'];
			$response = sendRequest_offline($httpmethod, $url, $clientKey, $contentType, $phone);
			$json_data = json_decode($response, true);
			print_r($json_data);
			/*
			받아온 결과값을 DB에 저장 및 Variation
			*/
			$query3 = "INSERT INTO sms_info(send_phone, send_status, cmid, send_regdate) values('".$phone."','".$json_data['result_code']."','".$json_data['cmid']."','".date("Y-m-d H:i:s")."')";
			$result3 		= mysqli_query($my_db, $query3);

			$query2 = "UPDATE calendar_info SET mb_lms='Y' WHERE mb_phone='".$phone."'";
			$result2 		= mysqli_query($my_db, $query2);
		//}

		if ($json_data['result_code'] == "200")
			$flag = "Y";
		else
			$flag = "N";

		return $flag;
	}

	function sendRequest($httpMethod, $url, $clientKey, $contentType, $phone, $s_url) {

		//create basic authentication header
		$headerValue = $clientKey;
		$headers = array("x-waple-authorization:" . $headerValue);

		$params = array(
			'send_time' => '', 
			'send_phone' => '07048881164', 
			'dest_phone' => $phone, 
			//'dest_phone' => '010-9901-7644',
			'send_name' => '', 
			'dest_name' => '', 
			'subject' => '[2015 베비언스 어워즈]',
			'msg_body' => "
2015 베비언스 어워즈 캠페인에 후보 지원을 해주셔서 감사드립니다.

▶ 나의 선물 번호 확인
".$s_url."

*문자를 지우지 마세요*
발송문자를 통해서만 선물번호를 확인하실 수 있습니다.
또한 참여할때마다 받는 선물을 계속 확인하실 수 있습니다.

이벤트 관련 문의 : 070-4888-3580
jh.woo@minivertising.kr (평일 10시 ~ 18시)
"
		);

		//curl initialization
		$curl = curl_init();

		//create request url
		//$url = $url."?".$parameters;

		curl_setopt ($curl, CURLOPT_URL , $url);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt ($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt ($curl, CURLINFO_HEADER_OUT, true);
		curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, false);

		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
		curl_setopt($curl, CURLOPT_TIMEOUT, 30);

		$response = curl_exec($curl);

		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$responseHeaders = curl_getinfo($curl, CURLINFO_HEADER_OUT);


		curl_close($curl);

		return $response;
	}

	function sendRequest_calendar($httpMethod, $url, $clientKey, $contentType, $phone, $serial) {

		//create basic authentication header
		$headerValue = $clientKey;
		$headers = array("x-waple-authorization:" . $headerValue);

		$params = array(
			'send_time' => '', 
			'send_phone' => '07048881164', 
			'dest_phone' => $phone, 
			//'dest_phone' => '01099017644',
			'send_name' => '', 
			'dest_name' => '', 
			'subject' => '[베비언스]',
			'msg_body' => "
축하드립니다!
베비언스 포토달력 이벤트에서 포토달력 3권 + 베비언스 외출팩에 당첨되셨습니다.

우리 아기사진으로 엄마가 직접 만드는 특별한 포토달력

▶ 포토달력 쿠폰 번호
".$serial."

▶ 포토달력 쿠폰 유효기간
11월 20일 ~ 12월 16일
유효기간이 지나면 쿠폰 사용이 불가능합니다.

▶ 배송 방법
달력 제작 후 당일 발송

아래 링크를 통해 쿠폰번호를 입력하고 베비언스 포토달력을 만들어보세요!

▶ 베비언스 포토달력 만드는 곳
http://bit.ly/calendar_16

*포토달력은 PC에서만 제작이 가능합니다 
*웹 브라우저는 Internet Explorer에서만 제작이 가능합니다.

- 베비언스 포토달력을 만들기 위해서는 맘스다이어리 로그인이 필요합니다.
- 포토달력 3권과 베비언스 외출팩은 각각 따로 배송됩니다.

이벤트 관련 문의 : 070-4888-1164
jh.woo@minivertising.kr (평일 10시 ~ 18시)
"
		);

		//curl initialization
		$curl = curl_init();

		//create request url
		//$url = $url."?".$parameters;

		curl_setopt ($curl, CURLOPT_URL , $url);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt ($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt ($curl, CURLINFO_HEADER_OUT, true);
		curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, false);

		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
		curl_setopt($curl, CURLOPT_TIMEOUT, 30);

		$response = curl_exec($curl);

		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$responseHeaders = curl_getinfo($curl, CURLINFO_HEADER_OUT);


		curl_close($curl);

		return $response;
	}

	function sendRequest_offline($httpMethod, $url, $clientKey, $contentType, $phone) {

		//create basic authentication header
		$headerValue = $clientKey;
		$headers = array("x-waple-authorization:" . $headerValue);

		$params = array(
			'send_time' => '', 
			'send_phone' => '07048881164', 
			'dest_phone' => $phone, 
			//'dest_phone' => '01099017644',
			'send_name' => '', 
			'dest_name' => '', 
			'subject' => '베비언스 Awards',
			'msg_body' => "
안녕하세요.
베비언스 이벤트 팀입니다.

올해 베비언스를 사랑해주신 VIP 고객님 대상으로 연말행사에 초대드리고자 연락드립니다.

압구정 CGV에서 아기와 함께 편히 영화 보실 수 있는 시간을 준비했습니다.

행사내용
- 1부: 아기와 함께 영화감상
- 2부: LG생활건강 30만원 상당 선물 추첨

- 장소 : 압구정 CGV
- 일시 : 12월 15일 낮 1시반~5시

간단하게 문자로 전달드리오니, 전화주시면 자세히 설명드리겠습니다.
"
		);

		//curl initialization
		$curl = curl_init();

		//create request url
		//$url = $url."?".$parameters;

		curl_setopt ($curl, CURLOPT_URL , $url);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt ($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt ($curl, CURLINFO_HEADER_OUT, true);
		curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, false);

		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
		curl_setopt($curl, CURLOPT_TIMEOUT, 30);

		$response = curl_exec($curl);

		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$responseHeaders = curl_getinfo($curl, CURLINFO_HEADER_OUT);


		curl_close($curl);

		return $response;
	}

	// LMS 발송 
	function send_lms2($phone, $serial)
	{
		global $_gl;
		global $my_db;

		$s_url		= "http://awards.babience-event.com/MOBILE/coupon_page.php?mid=".$phone;
		$httpmethod = "POST";
		$url = "http://api.openapi.io/ppurio/1/message/lms/minivertising";
		$clientKey = "MTAyMC0xMzg3MzUwNzE3NTQ3LWNlMTU4OTRiLTc4MGItNDQ4MS05NTg5LTRiNzgwYjM0ODEyYw==";
		$contentType = "Content-Type: application/x-www-form-urlencoded";
	
		$response = sendRequest2($httpmethod, $url, $clientKey, $contentType, $phone, $s_url);

		$json_data = json_decode($response, true);

		/*
		받아온 결과값을 DB에 저장 및 Variation
		*/
		$query3 = "INSERT INTO sms_info(send_phone, send_status, cmid, send_regdate) values('".$phone."','".$json_data['result_code']."','".$json_data['cmid']."','".date("Y-m-d H:i:s")."')";
		$result3 		= mysqli_query($my_db, $query3);

		$query2 = "UPDATE voter_info SET vote_lms='Y' WHERE vote_phone='".$phone."'";
		$result2 		= mysqli_query($my_db, $query2);

		if ($json_data['result_code'] == "200")
			$flag = "Y";
		else
			$flag = "N";

		return $flag;
	}

	function sendRequest2($httpMethod, $url, $clientKey, $contentType, $phone, $s_url) {

		//create basic authentication header
		$headerValue = $clientKey;
		$headers = array("x-waple-authorization:" . $headerValue);

		$params = array(
			'send_time' => '', 
			'send_phone' => '07048881164', 
			'dest_phone' => $phone, 
			//'dest_phone' => '010-9901-7644',
			'send_name' => '', 
			'dest_name' => '', 
			'subject' => '[2015 베비언스 어워즈]',
			'msg_body' => "
2015 베비언스 어워즈 캠페인에 심사위원으로 소중한 투표를 해주셔서 감사드립니다.

▶ 나의 선물 번호 확인
".$s_url."

*문자를 지우지 마세요*

발송문자를 통해서만 선물번호를 확인하실 수 있습니다.
또한 참여할때마다 받는 선물을 계속 확인하실 수 있습니다.

이벤트 관련 문의 : 070-4888-3580
jh.woo@minivertising.kr (평일 10시 ~ 18시)
"
		);

		//curl initialization
		$curl = curl_init();

		//create request url
		//$url = $url."?".$parameters;

		curl_setopt ($curl, CURLOPT_URL , $url);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt ($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt ($curl, CURLINFO_HEADER_OUT, true);
		curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, false);

		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
		curl_setopt($curl, CURLOPT_TIMEOUT, 30);

		$response = curl_exec($curl);

		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$responseHeaders = curl_getinfo($curl, CURLINFO_HEADER_OUT);


		curl_close($curl);

		return $response;
	}

?>