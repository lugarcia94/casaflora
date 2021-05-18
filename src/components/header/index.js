import './index.styl';


$('.close__menu.visible__mobile').on('click', function () {
    $('body').removeClass('is-menu')
})

if ($(window).width() < 992) {
    $('.newmenu__list >li').on('click', function (e) {
        let target = e.target
        if($(target).hasClass('has__child')) {
            $(this).toggleClass('open__sub')
        } else {
            if($(target).parent().hasClass('newmenu__list-nv2')) {
                $(target).toggleClass('open__sub__three')
            }
            
        }
        
    })
}