<?
	include_once   "./header.php";
?>
<body>
 	<div class="sec_top">
    	<div class="inner_sec_top clearfix">
	        <div class="logo"><a href="#"><img src="images/logo.png" alt=""/></a></div>
	        <div class="menu"><a href="#"><img src="images/menu_ham.png" width="95" alt=""/></a></div>
            
        </div>
    </div>

    <div class="sec_sub_img">
    	<div class="close"><a href="#"><img src="images/btn_close.png" width="35" alt=""/></a></div>
    	<div class="game">
        	<div class="inner_game">
            	<div class="step bg"><img src="images/step_1.png" alt=""/></div>
                <div class="txts clearfix">
                	<div class="txt"><img src="images/txt_time_limit.png" width="240" alt=""/></div>
                    <div class="time">26<span>초</span></div>
                </div>
                <div class="bar">
                	<div class="inner_bar">
                    	<div class="blue">
                        </div>
                    </div>
                </div>
               
               
               <!--첫번째 그림시작-->
                <div class="game_img start" style="display:none;">
                    <div class="bg">
                		<a href="#"><img src="images/game_img_1_1.png" alt=""/></a>
                    </div>
                </div>
                
               <!--첫번째 그림찾기-->
                <div class="game_img after">
                	<div class="btn_billy step_1">
                    	<a href="#">빌리</a>
                    </div>
                    <div class="bg">
                		<img src="images/game_img_1_2.png" alt=""/>
                    </div>
                </div> 
                
                
                
            </div>
        </div>
        <div class="input_info">
        	<div class="inner_input_info">
  				<div class="input"><input type="text"></div>
                <div class="input phone"><input type="text" value="-없이 번호만 적어주세요"></div>
                <div class="select_area">
                	<select>
                    	<option value="text1">text1</option>
                    </select>
                </div>
                <div class="select_store">
                	<select>
                    	<option value="text1">text1</option>
                    </select>
                 </div>
                
                <div class="check"><a href="#"><img src="images/checked.png" alt=""/></a></div>
                <div class="btn_detail"><a href="#"><img src="images/btn_detail.png" alt=""/></a></div>
                
                <div class="btn_input"><a href="#"><img src="images/btn_input.png" alt=""/></a></div>
                <div class="bg">
                    <img src="images/bg_input.png" alt=""/>
                </div>
            </div>
        </div>
    	<div class="thanks bg">
        	<a href="#"><img src="images/bg_thanks.png" alt=""/></a>
        </div>
    	<div class="bg"><img src="images/bg_sub_game.jpg" alt=""/></div>
    </div>
    


<div class="mask"></div>
<?
	include_once   "./popup_div.php";
?>
<div class="mask"></div>
</body>
</html>
<script type="text/javascript">
$(document).ready(function() {
	//Kakao.init('f3a512c4931967328de52deaf00f614e');01065200385
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