import './style.styl';
import { slug } from 'Core/functions';

const body = $('body');
const cores = $('.sidebar .Cores a');
const h5 = $('.sidebar h5');

$('.sidebar__button--open').click(function(){
    body.addClass('sidebar--open');
});

$(".sidebar__button--close").click(function(){
    body.removeClass('sidebar--open');
});

$('.sidebar__container').click(function(evt){
    if($(evt.target).hasClass('sidebar__container')) {
        body.removeClass('sidebar--open');
    }
});

if (jQuery(window).width() < 992) {
    $(".searchResultsTime").prepend('<button class="button sidebar__button sidebar__button--open"><svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.1666 17.8298H19.6001C19.1828 16.441 17.9067 15.4204 16.384 15.4204C14.8613 15.4204 13.5862 16.441 13.168 17.8298H0.96375C0.431752 17.8298 0 18.2616 0 18.7936C0 19.3256 0.431752 19.7574 0.96375 19.7574H13.1679C13.5852 21.1461 14.8613 22.1668 16.384 22.1668C17.9067 22.1668 19.1818 21.1461 19.6001 19.7574H22.1666C22.6995 19.7574 23.1303 19.3256 23.1303 18.7936C23.1303 18.2616 22.6996 17.8298 22.1666 17.8298ZM16.384 20.2393C15.587 20.2393 14.9384 19.5907 14.9384 18.7936C14.9384 17.9966 15.587 17.348 16.384 17.348C17.1811 17.348 17.8297 17.9966 17.8297 18.7936C17.8297 19.5907 17.181 20.2393 16.384 20.2393Z" fill="#CFB486"/><path d="M22.1666 2.4094H19.6001C19.1818 1.02063 17.9067 0 16.384 0C14.8613 0 13.5862 1.02063 13.1679 2.4094H0.96375C0.431752 2.4094 0 2.84115 0 3.37315C0 3.90515 0.431752 4.3369 0.96375 4.3369H13.1679C13.5862 5.72572 14.8613 6.74634 16.384 6.74634C17.9068 6.74634 19.1819 5.72572 19.6001 4.33694H22.1666C22.6996 4.33694 23.1304 3.90519 23.1304 3.37319C23.1304 2.8412 22.6996 2.4094 22.1666 2.4094ZM16.384 4.8188C15.587 4.8188 14.9384 4.1702 14.9384 3.37315C14.9384 2.5761 15.587 1.9275 16.384 1.9275C17.1811 1.9275 17.8297 2.5761 17.8297 3.37315C17.8297 4.1702 17.181 4.8188 16.384 4.8188Z" fill="#CFB486"/><path d="M22.1666 10.1196H9.96246C9.54417 8.73083 8.26911 7.71021 6.74639 7.71021C5.22367 7.71021 3.94856 8.73083 3.53032 10.1196H0.96375C0.431752 10.1196 0 10.5514 0 11.0834C0 11.6154 0.431752 12.0471 0.96375 12.0471H3.53027C3.94856 13.4359 5.22362 14.4565 6.74634 14.4565C8.26906 14.4565 9.54417 13.4359 9.96241 12.0471H22.1666C22.6995 12.0471 23.1303 11.6154 23.1303 11.0834C23.1304 10.5514 22.6996 10.1196 22.1666 10.1196ZM6.74634 12.529C5.94929 12.529 5.30069 11.8804 5.30069 11.0834C5.30069 10.2863 5.94929 9.63771 6.74634 9.63771C7.54339 9.63771 8.19199 10.2863 8.19199 11.0834C8.19199 11.8804 7.54339 12.529 6.74634 12.529Z" fill="#CFB486"/></svg></button>')
}

(async () => {
    if(cores.length) {
        await cores.each(function(){
            const url = '/arquivos/' + slug($(this).attr('title')) + '.jpg';
            const image = new Image();
            const text = $(this).text();

            $(this).html('');
            $(this).prepend(`<span>${ text }</span>`);

            image.onload = () => {
                $(this).prepend(image);
                $(this).closest('li').addClass('thumb');
            };
            image.onerror = () => {
                $(this).closest('li').addClass('not-thumb');
            };
            image.src = url;
        });
    }
    if(h5.length) {
        await h5.each(function(){
            const fieldset = $(this).closest('fieldset');
            fieldset.find('label').each(function(){
                const text = $(this).text();
                $(this).html($(this).html().replace(text, ''));
                $(this).append($('<span>').append(text));
            });
            if($(this).text() == 'Cores') {
                $(this).next().addClass('fields-thumbs');
                
                fieldset.find('label:not(.thumb) input').each(function(){
                    const url = '/arquivos/' + slug($(this).val()) + '.jpg';
                    const image = new Image();
                    const html = $(this).closest('label');

                    image.onload = () => {
                        html.find('input').after($('<span class="image">').append(image));
                        html.addClass('thumb');
                    };
                    image.onerror = () => {
                        html.addClass('not-thumb');
                    };
                    image.src = url;
                });
            }
        });
    }


    $('.fields-thumbs .filtro-ativo').each(function(){
        const url = '/arquivos/' + slug($(this).text()) + '.jpg';
        const image = new Image();
        const text = $(this).text();


        $(this).html($(this).html().replace(text, ''));
        $(this).append(`<span>${ text }</span>`);

        image.onload = () => {
            $(this).append(image);
            $(this).addClass('thumb');
        };

        image.src = url;
    });

    $('.search-multiple-navigator .fields-thumbs .ver-filtros').not('.thumb').not('.not-thumb').each(function(){
        const label = $(this).closest('.fields-thumbs').find('label');
        const url = '/arquivos/' + slug(label.text()) + '.jpg';
        const image = new Image();

        image.onload = () => {
            label.append(image);
            label.addClass('thumb');
        };

        image.src = url;

    });
})();


$(".search-single-navigator h5").on('click', function() {
    $(this).toggleClass("inativo")
    $(this).next().slideToggle(200)
});

$(".search-single-navigator h3").on('click', function() {
    $(this).toggleClass("inativo")
    $(this).next().slideToggle(200)
});

$(".search-single-navigator > ul").hide()
