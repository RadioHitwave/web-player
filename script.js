function getMediaAmplifier(mediaElem) {
	var context = new (window.AudioContext || window.webkitAudioContext),
		result = {
			context: context,
			source: context.createMediaElementSource(mediaElem),
			gain: context.createGain(),
			media: mediaElem,
			amplify: function (ampLevel) {
				result.gain.gain.value = ampLevel;
			},
			getAmpLevel: function () {
				return result.gain.gain.value;
			}
		};
	result.source.connect(result.gain);
	result.gain.connect(context.destination);
	return result;
}

$(document).ready(function () {
	const $play = $("#play");
	const $stream = $("#stream");
	const $title = $("#title");
	const $cover = $("#cover img");
	const $volume = $("#volumeSlider");

	let streamAmplifier = null;

	$volume.slider({
		formatter: function (value) {
			return 'Current value: ' + value;
		}
	});
	$volume.on("slide", function (slideEvt) {
		if (streamAmplifier === null)
			streamAmplifier = getMediaAmplifier($stream[0]);
		streamAmplifier.amplify(slideEvt.value / 100);
	});

	textFit($play, {alignHoriz: true, alignVert: true});

	var initialLoadingDone = false;
	var originalDocumentTitle = document.title;

	$stream.on("canplay", function () {
		initialLoadingDone = true;
		$("#stream").trigger("play");
	});

	function ajax() {
		$.getJSON("https://streamdata.radiohitwave.com/api/", function (data) {
			$cover.attr("src", data.cover);
			$title.html(data.title);
			document.title = originalDocumentTitle + " | " + data.title;
			textFit($title, {alignHoriz: true, alignVert: true, maxFontSize: 22});
		});
	}

	const playIcon = $("#play i");
	$stream.on("play pause", function () {
		if (!initialLoadingDone) {
			$volume.slider("enable");
			playIcon.addClass("fa-spin fa-spinner");
			return;
		}
		playIcon.toggleClass("fa-play fa-pause");
		playIcon.removeClass("fa-spin fa-spinner");
	});

	$play.click(function () {
		const nativeStream = $stream[0];
		if (nativeStream.paused) {
			nativeStream.play();
		} else if (nativeStream.readyState >= 3) {
			nativeStream.pause();
		}
	});

	ajax();
	setInterval(ajax, 5000);

	setTimeout(() => $("body").css("visibility", "visible"), 100);
});
