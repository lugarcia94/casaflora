import './style.styl';

$(".help__title").click(function () {
    $('.help__title').parent().removeClass('help__item--open')
    $(this).parent().toggleClass("help__item--open");
});

$(".help__menu--item").click(function () {
    $('.help__title').parent().removeClass('help__item--open')
    $(this).toggleClass("help__menu--open");
});