<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html">
<title>ID 값 전송</title>
</head>
<body>
<script type="text/javascript">
function chk_byte(in_texts, text_max)
{
  var ls_str = in_texts.value; 
  var li_str_len = ls_str.length; //전체길이
  //변수초기화
  var li_max = text_max; //제한할 글자수 크기
  var i = 0;
  var li_byte = 0;   //한글일경우 2, 그외글자는 1을 더함
  var li_len = 0;    // substring하기 위해 사용
  var ls_one_char = "";  //한글자씩 검사
  var ls_str2 = "";      //글자수를 초과하면 제한한 글자전까지만 보여줌.
  
  for(i=0; i< li_str_len; i++)
  {
    ls_one_char = ls_str.charAt(i);   //한글자 추출
    if(escape(ls_one_char).length > 4){ 
      li_byte +=2;   //한글이면 2를 더한다
    }else{
      li_byte++;     //한글아니면 1을 다한다
    }
      
    if(li_byte <= li_max){
      li_len = i + 1;
    }
  }
  if(li_byte > li_max)
  {
    alert( li_max + "글자를 초과 입력할수 업습니다.");
    ls_str2 = ls_str.substr(0, li_len);
    in_texts.value = ls_str2;
  }
  //in_texts.focus();
  return li_byte;
}
//-->
</script>
<textarea style="color: #000000;" cols="50" name="REPORT" rows="20"onkeyup="document.all.text_chk_cnt.value=chk_byte(this,6);"></textarea>
<br>
입력글자수 : <input name="text_chk_cnt" type="text" maxlength="3" value="" style="width:40px;" class="inputtext" readOnly></input>/6 byte

</body>
</html>