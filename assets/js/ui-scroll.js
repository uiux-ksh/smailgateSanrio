var windowWidth = $(window).innerWidth();
var scrollLocation = 0;

$(document).ready(function () {
    var eventSection = $(".sanrio-inner");
    var eventWidth = eventSection.width();
    var centerPosition = parseInt(eventWidth / 2 - windowWidth / 2);

    activeScrollArrow();

    $(window).resize(function () {
        windowWidth = $(window).innerWidth();
        centerPosition = parseInt(eventWidth / 2 - windowWidth / 2);

        activeScrollArrow();
    });

    $(".event-sanrio").mousewheel(function (event, delta) {
        event.preventDefault();
        this.scrollLeft -= delta * 20;
    });

    $(".event-sanrio").on("scroll", easeScroll);
    function easeScroll() {
        scrollLocation = $(".event-sanrio").scrollLeft();
        sx = scrollLocation;
        sy = $(".event-sanrio").scrollTop();

        activeScrollArrow();

        TweenMax.to($(".data-area"), 0.3, {
            x: scrollLocation,
            ease: Linear.easeNone,
        });

        scrollLocation >= centerPosition
            ? $(".title-box, .btn-box").addClass("step02")
            : $(".title-box, .btn-box").removeClass("step02");
    }

    $(".btn-left").click(function (e) {
        e.preventDefault();
        $(".event-sanrio").stop().animate(
            {
                scrollLeft: 0,
            },
            500
        );
    });

    $(".btn-right").click(function (e) {
        e.preventDefault();
        $(".event-sanrio")
            .stop()
            .animate(
                {
                    scrollLeft: $(".sanrio-inner").width(),
                },
                500
            );
    });

    function activeScrollArrow() {
        scrollLocation > 0 ? $(".btn-left").show() : $(".btn-left").hide();

        scrollLocation + windowWidth >= eventWidth
            ? $(".btn-right").hide()
            : $(".btn-right").show();
    }
});
