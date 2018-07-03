$(document).ready(function () {
    textFit($("#play"), {alignHoriz: true, alignVert: true});

    var initialLoadingDone = false;

    $("#stream").on("canplay", function () {
        initialLoadingDone = true;
        $("#stream").trigger("play");
    });

    function loadCoverImage() {
        $("#cover img").attr("src", "https://streamdata.radiohitwave.com/cover/?image&_t=" + $.now());
    }

    function loadTitle() {
        $("#title").load("https://streamdata.radiohitwave.com/title/?_t=" + $.now(), function () {
            textFit($("#title"), {alignHoriz: true, alignVert: true, maxFontSize: 20});
        });
    }

    $("#stream").on("play pause", function () {
        if (!initialLoadingDone) {
            $("#play i").addClass("fa-spin fa-spinner");
            return;
        }
        $("#play i").toggleClass("fa-play fa-pause");
        $("#play i").removeClass("fa-spin fa-spinner");
    });


    $("#play").click(function () {
        $stream = $("#stream")[0];
        if ($stream.paused) {
            $stream.play();
        } else if ($stream.readyState >= 3) {
            $stream.pause();
        }
    });

    loadCoverImage();
    setInterval(function () {
        loadCoverImage()
    }, 5000);

    loadTitle();
    setInterval(function () {
        loadTitle()
    }, 5000);
});
