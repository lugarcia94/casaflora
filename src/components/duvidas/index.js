import './style.styl';

$( ".help__title" ).click(function() {
    $(this).parent().toggleClass("help__item--open");
});

$( ".help__menu--item" ).click(function() {
    $(this).toggleClass("help__menu--open");
});