<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
 </head>
 <body>
  <span id="timer"></span>
 </body>
</html>
<script type="text/javascript">
    var count = 2600;
    
    var counter = setInterval(timer, 10); //10 will  run it every 100th of a second
    
    function timer()
    {
        if (count <= 0)
        {
            clearInterval(counter);
            return;
         }
         count--;
         document.getElementById("timer").innerHTML=count /100+ " secs"; 
     }
</script>