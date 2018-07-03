$(document).ready(function () {
    textFit($("#play"), {alignHoriz: true, alignVert: true});

    var initialLoadingDone = false;

    $("#stream").on("canplay", function () {
        initialLoadingDone = true;
        $("#stream").trigger("play");
    });

    function ajax() {
        $.getJSON("https://streamdata.radiohitwave.com/api/", function (data) {
            $("#cover img").attr("src", data.cover);
            $("#title").html(data.title);
            textFit($("#title"), {alignHoriz: true, alignVert: true, maxFontSize: 22});
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

    ajax();
    setInterval(ajax, 5000);
});
