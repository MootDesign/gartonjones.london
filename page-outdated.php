<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Update your Browser | Garton Jones</title>
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Gilda+Display">
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/css/outdated.css">
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/outdatedbrowser.js"></script>
</head>
<body>
    <div id="header">
        <a href="<?php echo home_url(); ?>">
            <img class="site-logo" src="<?php echo get_template_directory_uri(); ?>/img/logo-big.png" alt="Garton Jones">
        </a>
    </div>
    
    <div id="main">
        <h1>
            You are using an<br>
            outdated browser
        </h1>
        
        <p>
            Please select one from below<br>
            You will need to update your browser
        </p>

        <center>
            <table class="update-links">
                <tr>
                    <td>
                        <a href="https://www.google.com/chrome/browser/desktop/">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/chrome.png" alt="Google Chrome">
                        </a>
                    </td>
                    <td>
                        <a href="http://www.mozilla.org/firefox/new/">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/firefox.png" alt="Firefox">
                        </a>
                    </td>
                    <td>
                        <a href="http://www.apple.com/osx/">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/safari.png" alt="Safari">
                        </a>
                    </td>
                    <td>
                        <a href="http://windows.microsoft.com/ie">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/ie.png" alt="Internet Explorer">
                        </a>
                    </td>
                </tr>
            </table>
        </center>
    </div>

    <div id="footer">
        <table>
            <tr>
                <td>
                    <span>Chelsea Bridge Wharf</span>
                    <a href="tel:02076228800">020 7622 8800</a>
                </td>
                <td>
                    <span>Westminster</span>
                    <a href="tel:02038113484">020 3811 3484</a>
                </td>
                <td>
                    <span>Nine Elms</span>
                    <a href="tel:02038113674">020 3811 3674</a>
                </td>
                <td>
                    <span>Southbank</span>
                    <a href="tel:02038113674">020 3811 3674</a>
                </td>
            </tr>
        </table>
    </div>

    <script type="text/javascript">
        //event listener: DOM ready
        function addLoadEvent(func) {
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function() {
                    if (oldonload) {
                        oldonload();
                    }
                    func();
                }
            }
        }
        //call plugin function after DOM ready
        addLoadEvent(function(){
            outdatedBrowser();
        });
    </script>
</body>
</html>