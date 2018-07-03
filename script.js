$(document).ready(function () {
    textFit($("#play"), {alignHoriz: true, alignVert: true});

    var initialLoadingDone = false;

    $("#stream").on("canplay", function () {
        initialLoadingDone = true;
        $("#stream").trigger("play");
    });

    var currentCoverUrl;
    function loadCoverImage() {
        $.get("https://streamdata.radiohitwave.com/api/?cover&string", function(newCoverUrl){
           if (currentCoverUrl !== newCoverUrl){
               $("#cover img").attr("src", newCoverUrl);
               currentCoverUrl = newCoverUrl;
           }
        });
    }

    function loadTitle() {
        $("#title").load("https://streamdata.radiohitwave.com/api/?title&_t=" + $.now(), function () {
            textFit($("#title"), {alignHoriz: true, alignVert: true, maxFontSize: 20});
        });
    }

    function ajax() {
        loadTitle();
        loadCoverImage();
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

    ajax();
    setInterval(ajax, 5000);
});
