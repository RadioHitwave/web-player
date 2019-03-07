<!DOCTYPE html>
<html lang="de">
	<head>
		<meta charset="UTF-8">
		<title>Radio Hitwave</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.6.1/css/bootstrap-slider.min.css"/>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"/>
		<link rel="stylesheet" href="style.css?_v=<?= md5_file('style.css') ?>"/>
	</head>
	<body style="visibility: hidden">
		<div id="cover"><img src="" alt="cover"/></div>
		<div id="logo"><img src="logo.png" alt="cover"/></div>
		<div id="play"><i class="fas fa-play"></i></div>
		<div id="volume">
			<form>
				<input id="volumeSlider" data-slider-id='volumeSlider' type="text" data-slider-min="0" data-slider-max="200" data-slider-step="1" data-slider-value="100"/>
			</form>
		</div>
		<div id="title"></div>
		<audio id="stream" src="https://stream-public.radiohitwave.com/stream?nocache" preload="none" title="Radio Hitwave"></audio>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/textfit/2.3.1/textFit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.6.1/bootstrap-slider.min.js"></script>
		<script src="script.js?_v=<?= md5_file('script.js') ?>"></script>
	</body>
</html>
