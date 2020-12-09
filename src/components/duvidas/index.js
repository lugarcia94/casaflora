import './style.styl';

$(".help__title").click(function () {
    $('.help__item').removeClass("help__item--open");

    $(this).parent().toggleClass("help__item--open");
});

