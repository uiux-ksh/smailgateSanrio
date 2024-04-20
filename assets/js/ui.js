var headerHeight;
var notToday = false;
var heightSpace;

//window odd fixed
function oddFixed() {
    if ($(window).width() % 2 != 0) {
        var width = $(window).width() - 1;
        $("html").width(width);
    } else {
        $("html").width("100%");
    }
}

$(window).on("load", function () {
    headerHeight = $("#evt_wrap").offset().top;

    Scrollbar.initAll({
        alwaysShowTracks: true,
    });

    lnbListControl();
    setTimeout(function () {
        lnbControl();
    }, 100);
    setTimeout(function () {
        if ($(".evt-lnb").hasClass("open")) lnbControl();
    }, 1100);
    $(".btn-control").on("click", function () {
        lnbControl();
    });
});

$(window).resize(function () {
    oddFixed();
});

function initHeight(hSize) {
    // 스토브 : c1 = 48
    // 넥슨 : c18 = 63
    // 다음 : c7 = 0
    // 한게임 : c2 = 51
    // 카툰네트웍스 : c17 = 156
    // 네이버게임 : c13 = 0

    switch (hSize) {
        case "c1":
            heightSpace = 49;
            break;
        case "c18":
            heightSpace = 63;
            break;
        case "c7":
            heightSpace = 0;
            break;
        case "c2":
            heightSpace = 51;
            break;
        case "c17":
            heightSpace = 156;
            break;
        case "c13":
            heightSpace = 0;
            break;
    }

    document.documentElement.style.setProperty('--topValue', heightSpace ? `${heightSpace}px` : '0px');
    $("#evt_wrap").height("calc(100% - " + heightSpace + "px)");
    $(".evt-lnb").css("top", heightSpace + "px");
}

var $popup;
function popup(obj, url, isGtagMode) {
    $popup = $(obj);
    var targetY = $(window).scrollTop() + 190;
    (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);
    $popup.addClass("show").css({ opacity: 1 });

    if (!!notToday) {
        $(".btn-anymore").hide();
    }

    if (!isGtagMode && !!url) {
        var iframeHtml = '<div id="player" class="iframe"></div>';

        $popup.find(".iframe-area").empty().append(iframeHtml);
        onYouTubePlayerAPIReady();
    }
}

function popupClose(that, isSelf) {
    var $isSelf = isSelf;
    var $popup = $isSelf ? $(that) : $(that).parents(".popup");
    var $type = $popup.attr("data-popup-id");

    $(".evt-content").unbind("touchmove");
    $popup.removeAttr("style").removeClass("show");

    if ($type == "youtube") {
        $popup.find(".iframe-area").empty();
    }

    if ($type == "goods" && !isSefl) {
        $(".lnb-list li").removeClass("active");
        $(".lnb-list li[data-state=open]").addClass("active");
    }
}

function lnbControl() {
    var $lnb = $(".evt-lnb");
    $lnb.toggleClass("open");
    $('.btn-left').toggleClass("lnb-open");

    var isOpen = $lnb.hasClass("open");
    $lnb.css("left", isOpen ? "0" : "-306px");
}

function lnbListControl() {
    $(".lnb-list a.lnb-item").on("click", function () {
        $(".lnb-list li").removeClass("active");

        var $li = $(this).parents("li");
        $li.addClass("active");

        popupClose($(".popup.show"), true);
    });
}
