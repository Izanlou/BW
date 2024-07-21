<html>

<head>
    <meta name="viewport" charset="UTF-8" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>ʙʟᴀᴄᴋ ᴀɴᴅ ᴡʜɪᴛᴇ ⱽ³</title>
    <link rel="icon" type="image/x-icon" href="./data/ICON.ico">
    <link rel="apple-touch-icon" type="image/x-icon" href="./data/ICON.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <link rel="stylesheet" href="css/form_u3.css">
    <link rel="manifest" href="./manifest.json">
    <script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js').then(function(registration) {
            console.log('S: ', registration.scope);
        }).catch(function(err) {
            console.log('F: ', err);
        });
    }
    </script>
</head>

<body>
    <div id="BG"></div>
    <div id="main_div">
    <div id="logo_div"><img class="logo" src="./data/LOGO.png"></div>
    <div id="roller_div"><span id="roller">
        Secure connection!<br>
        Uninterrupted & Fast!<br>
        B&W is it all!<br>
    <span id="roller_main">Log-In for a Chat!</span></div>
    <div id="username_div"><input class="input" id="username" placeholder="Username"></div>
    <div id="password_div"><input class="input" id="password" type="password" placeholder="Password"></div>
    <div id="check_box_div"><span>Remember Me!</span><input type="checkbox" id="check_box"></div>
    <div id="log_in_div"><button class="button" id="log_in">Log-In</button></div>
    <div id="sign_up_div"><a class="url" id="sign_up" href="./sign_up_u3.php">Wanna Sign-Up!?</a></div></div>
    <div id="footer_div"><span class="footer">Made with <span style="color: red;"><3</span> by <a class="url" href="https://ariaizanlou.ir">Izanlou</a> | Oct / 2023</span></div>
    <script src="./js/log_in_u3.js"></script> 
</body>

</html>

<!--Izanlou / Nov 2023-->