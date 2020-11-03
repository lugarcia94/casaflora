import './index.styl';


$('.close__menu.visible__mobile').on('click', function () {
    $('body').removeClass('is-menu')
})

if ($(window).width() < 992) {
    $('.newmenu__list li').on('click', function () {
        $(this).toggleClass('open__sub')
    })
}