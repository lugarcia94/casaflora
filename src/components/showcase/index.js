import './style.styl';
import { buttonBuy, slug } from "Core/functions"


$('.showcase').each(function(){
    let title = $(this).find('h2');

    if( title.length ) {
        let text = title.text().split('-');

        if(text.length > 1) {
            title.html(`<strong>${text[0]}</strong> ${text[1]}`);
        }
    }

    title
        .addClass('showcase__title')
        .addClass('showcase__title--actived');
});

$(".showcase-tabs__tabs-item").click(function() {
    $(".showcase-tabs__tabs-item").removeClass("showcase-tabs__tabs-item--active")
    $(this).addClass("showcase-tabs__tabs-item--active")
    const showcase = "."+$(this).attr("data-showcase")
    $(".showcase-tabs__showcase .showcase").removeClass("showcase--active")
    $(showcase).addClass("showcase--active")
});

if($('body').hasClass('quickview')) {
    const linkProduct = sessionStorage.getItem('linkProduct');
    $( "div.product__page>a" ).attr( "href", linkProduct );
}

$('.showcase').on('click', '.showcase__quickview', function(){
    const link = $(this).closest('.showcase__item').find('.showcase__link');
    sessionStorage.setItem('linkProduct', '');
    if(link.length) {
        sessionStorage.setItem('linkProduct', link.attr('href'));
    }
    $(this).find('a').trigger('click');
});


$vtex(document).ajaxComplete((evt, xhr, set) => {
    if(set.url.indexOf('/buscapagina') !== -1) {
        loadVideocat()
    }
});


$(document).ready(function() { 
    if($('body:not(.produto)').length) {
        loadVideo()
        loadVideocat()
    }

});

function loadVideo() {

        $('.showcase__container > div > ul li').each(function () {
            let idProduct = $(this).find('.product__video').attr('data-id')
            let elementVideo = $(this).find('.product__video')
            let elementVid = $(this) 
            let video = ''
            if(!$(elementVideo).hasClass('on__load-video')) {
                
                if (idProduct) {
                    const urlApi = '/api/catalog_system/pub/products/search?fq=productId:' + idProduct;
                    
                    $.get(urlApi).done(function (data) {
                        video = data[0].Regiao
                        
                        if (video) {
                            
                            if(elementVideo.attr('data-id') == data[0].productId) { 

                                let variableName = video
                                let namevariableNew = slug(variableName) + ".png"
                                let urlImage = "/arquivos/" + namevariableNew
                                elementVideo.html(`<img src="${urlImage}"/>`)
                
                      

                                elementVideo.show()
                                elementVideo.addClass('on__load-video')
                            }
                        }
                    });
                }
            }
        }) 
    }

    function loadVideocat() {

        $('.vitrine div  ul li').each(function () {
            let idProduct = $(this).find('.product__video').attr('data-id')
            let elementVideo = $(this).find('.product__video')
            let elementVid = $(this) 
            let video = ''
            if(!$(elementVideo).hasClass('on__load-video')) {
                
                if (idProduct) {
                    const urlApi = '/api/catalog_system/pub/products/search?fq=productId:' + idProduct;
                    
                    $.get(urlApi).done(function (data) {
                        video = data[0].Regiao
                        
                        if (video) {
                            
                            if(elementVideo.attr('data-id') == data[0].productId) { 

                                let variableName = video
                                let namevariableNew = slug(variableName) + ".png"
                                let urlImage = "/arquivos/" + namevariableNew
                                elementVideo.html(`<img src="${urlImage}"/>`)
                
                      

                                elementVideo.show()
                                elementVideo.addClass('on__load-video')
                            }
                        }
                    });
                }
            }
        }) 
    }

