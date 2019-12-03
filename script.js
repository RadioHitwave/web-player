$(document).ready(function () {
	const $play = $("#play");
	const $stream = $("#stream");
	const $title = $("#title");
	const $cover = $("#cover img");

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
			playIcon.addClass("fa-spin fa-spinner");
			return;
		}
		playIcon.toggleClass("fa-play fa-pause");
		playIcon.removeClass("fa-spin fa-spinner");
	});

	$play.on("click", function () {
		const nativeStream = $stream[0];
		if (nativeStream.paused) {
			nativeStream.play();
		} else if (nativeStream.readyState >= 3) {
			nativeStream.pause();
		}
	});

	ajax();
	setInterval(ajax, 5000);

	setTimeout(() => {
		$("body").css("visibility", "visible");
	}, 100);
});
