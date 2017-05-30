<?php
define('HTTP_BASE_PATH', 'http://localhost/ctrls/');
$messages = array();


$snippet1 ='
<style type="text/css">

.ffb-top {
    background: #fff;
    background: rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    width: 100%;
    font-size: 0.69em;
    line-height: 2.2;
}
.ffb-top a {
    padding: 0 1em;
    letter-spacing: 0.1em;
    display: inline-block;
}
.ffb-top a:hover {
    color: #007e89;
    background: rgba(255, 255, 255, 0.6);
}
.ffb-top span.right {
    float: right;
}
.ffb-top span.right a {
    float: left;
    display: block;
}

.ffb-content {
    color: #fff;
    background: #007e89;
    position: relative;
    border-radius: 3px;
    margin: 0 auto;
}
.ffb-content h3 {
    margin: 0;
    padding: 0.4em;
    text-align: center;
    font-size: 2.4em;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px 3px 0 0;
}
.ffb-content > div {
    padding: 15px 40px 30px;
    margin: 0;
    font-weight: 300;
    font-size: 1.15em;
}
.ffb-content > div p {
    margin: 0;
    padding: 10px 0;
}
.ffb-content > div ul {
    margin: 0;
    padding: 0 0 30px 20px;
}
.ffb-content > div ul li {
    padding: 5px 0;
}
.ffb-content .ffb-close {
    display: block;
    margin: 0 auto;
    font-size: 0.8em;
    border:1px solid green;
}
.ffb-close {
    border: none;
    padding: 0.6em 1.2em;
    background: #00646d;
    color: #fff;
    font-family: \'Lato\', Calibri, Arial, sans-serif;
    font-size: 1em;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-block;
    margin: 3px 2px;
    border-radius: 2px;
}
.ffb-close:hover {
    background: #00353a;
}

.ffb-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    max-width: 630px;
    min-width: 320px;
    height: auto;
    z-index: 2000;
    visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.ffb-show {
    visibility: visible;
}
.ffb-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
    background: rgba(143, 27, 15, 0.8);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.ffb-show ~ .ffb-overlay {
    opacity: 1;
    visibility: visible;
}
/* close */

.ffb-modal .ffb-close-icon:hover {
    background: url(\''.HTTP_BASE_PATH.'/ScrollPositionEndPagePopup/images/pop_close_hover.png\') no-repeat;
}
.ffb-modal .ffb-close-icon {
    display: block;
    width: 20px;
    height: 20px;
    overflow: hidden;
    background: url(\''.HTTP_BASE_PATH.'/ScrollPositionEndPagePopup/images/pop_close.png\') no-repeat;
    position: absolute;
    top: -30px;
    right: 0px;
    z-index: 999;
    cursor: pointer;
    border: none;
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
}
/* Blur background */

.ffb-show.ffb-effect ~ .ffb-overlay {
    background: rgba(78, 46, 32, 0.5);
}
.ffb-show.ffb-effect ~ .container {
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    filter: blur(3px);
}
/* Effect: Super scaled */

.ffb-effect .ffb-content {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.ffb-show.ffb-effect .ffb-content {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}
@media screen and (max-width: 32em) {
    body {
        font-size: 75%;
    }
}
</style>
	<!-- Modal is added here for the demo. -->
  <div class="ffb-modal ffb-effect" id="bounceModal">
    <div class="ffb-content">
      <a class="ffb-close ffb-close-icon"></a>
      <h3>Surprise!</h3>
      <div>
        <p>This is a modal window. You can do the following things with it:</p>
        <ul>
          <li><strong>Offer:</strong> You can make the offer that user can\'t refuse it.</li>
          <li><strong>Subscription:</strong> You can ask user for newsletter subscription.</li>
          <li><strong>Check:</strong> You can ask user to check another interesting article.</li>
        </ul>
        <button class="ffb-close">Close me!</button>
      </div>
    </div>
  </div>
  <!-- End page section -->
  <div class="ffb-overlay"></div>';

//$snippet1 = "<div><div>TESTING</div></div>";


$snippet2 = '
<style type="text/css">
.ffb-top {
    background: #fff;
    background: rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    width: 100%;
    font-size: 0.69em;
    line-height: 2.2;
}
.ffb-top a {
    padding: 0 1em;
    letter-spacing: 0.1em;
    display: inline-block;
}
.ffb-top a:hover {
    color: #007e89;
    background: rgba(255, 255, 255, 0.6);
}
.ffb-top span.right {
    float: right;
}
.ffb-top span.right a {
    float: left;
    display: block;
}

.ffb-content {
    color: #fff;
    background: #007e89;
    position: relative;
    border-radius: 3px;
    margin: 0 auto;
}
.ffb-content h3 {
    margin: 0;
    padding: 0.4em;
    text-align: center;
    font-size: 2.4em;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px 3px 0 0;
}
.ffb-content > div {
    padding: 15px 40px 30px;
    margin: 0;
    font-weight: 300;
    font-size: 1.15em;
}
.ffb-content > div p {
    margin: 0;
    padding: 10px 0;
}
.ffb-content > div ul {
    margin: 0;
    padding: 0 0 30px 20px;
}
.ffb-content > div ul li {
    padding: 5px 0;
}
.ffb-content .ffb-close {
    display: block;
    margin: 0 auto;
    font-size: 0.8em;
    border:1px solid red;
}
.ffb-close {
    border: none;
    padding: 0.6em 1.2em;
    background: #00646d;
    color: #fff;
    font-family: \'Lato\', Calibri, Arial, sans-serif;
    font-size: 1em;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-block;
    margin: 3px 2px;
    border-radius: 2px;
}
.ffb-close:hover {
    background: #00353a;
}

.ffb-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    max-width: 630px;
    min-width: 320px;
    height: auto;
    z-index: 2000;
    visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.ffb-show {
    visibility: visible;
}
.ffb-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
    background: rgba(143, 27, 15, 0.8);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.ffb-show ~ .ffb-overlay {
    opacity: 1;
    visibility: visible;
}
/* close */

.ffb-modal .ffb-close-icon:hover {
    background: url(\''.HTTP_BASE_PATH.'/ScrollPositionEndPagePopup/images/pop_close_hover.png\') no-repeat;
}
.ffb-modal .ffb-close-icon {
    display: block;
    width: 20px;
    height: 20px;
    overflow: hidden;
    background: url(\''.HTTP_BASE_PATH.'/ScrollPositionEndPagePopup/images/pop_close.png\') no-repeat;
    position: absolute;
    top: -30px;
    right: 0px;
    z-index: 999;
    cursor: pointer;
    border: none;
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
}
/* Blur background */

.ffb-show.ffb-effect ~ .ffb-overlay {
    background: rgba(78, 46, 32, 0.5);
}
.ffb-show.ffb-effect ~ .container {
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    filter: blur(3px);
}
/* Effect: Super scaled */

.ffb-effect .ffb-content {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.ffb-show.ffb-effect .ffb-content {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}
@media screen and (max-width: 32em) {
    body {
        font-size: 75%;
    }
}
</style>
<!-- Modal is added here for the demo. -->
  <div class="ffb-modal ffb-effect" id="exitIntentBounceModal">
    <div class="ffb-content">
      <a class="ffb-close ffb-close-icon"></a>
      <h3>Wait! Don\'t Go</h3>
      <div>
        <p>This is a modal window. You can do the following things with it:</p>
        <ul>
          <li><strong>Offer:</strong> You can make the offer that user can\'t refuse it.</li>
          <li><strong>Subscription:</strong> You can ask user for newsletter subscription.</li>
          <li><strong>Check:</strong> You can ask user to check another interesting article.</li>
        </ul>
        <button class="ffb-close">Exit intent Close me!</button>
      </div>
    </div>
  </div>
  <!-- End page section -->
  <div class="ffb-overlay"></div>';

$msg1 = array("id"=>1, "action"=>"page-conent-end", "snippet" => $snippet1);
$msg2 = array("id"=>2, "action"=>"page-bottom", "snippet" => $snippet2);
$msg3 = array("id"=>3, "action"=>"exit-intent", "snippet" => $snippet1);

array_push($messages, $msg1);
array_push($messages, $msg2);
array_push($messages, $msg3);

$data = array();
$data['messages'] = $messages;

echo json_encode($data);

?>