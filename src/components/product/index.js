import React from "react"
import ReactDOM from "react-dom"
import Attr from "./attr"
import { buttonBuy, slug } from "Core/functions"

import "slick-carousel"
import "slick-carousel/slick/slick.css"

import "./zoom.styl"
import "./style.styl"
import "./notifyme.styl"
import "./frete.styl"
import "./jquery-scrolltofixed.js"
import zoom from "Core/functions/zoom"
import getProductById from "Core/getProductById"
import "object.observe"

buttonBuy(".product__buy-qtds", ".buy-button", ".qtds__input")

const body = $vtex("body")
const attrs = Array.from(document.querySelectorAll("[data-attr]"))

attrs.forEach((attr) => {
    const name = attr.getAttribute("data-attr")
    ReactDOM.render(<Attr name={name} />, attr)
})

// Function set SKU code, show in tag HTML code
const setSkuID = (sku) => {
    const code = $vtex(".product__code")
    if (code.length) {
        code.html(sku).addClass("product__code--show")
    }
}

$("#calculoFrete").click(function () {
    $(".freight-values", this).hide()
})

// Check page product
if (body.attr("id") == "product-page") {
    $(document).ready(() => ShippingValue())
    // Correção para o zoom
    zoom()

    $(".product__variants").on("click", function () {
        $(".product__variations").addClass("on")
        if ($(window).width() > 991) {
            if ($("body").hasClass("quickview")) {
                $("html,body").animate(
                    {
                        scrollTop: $(".product__variations").offset().top,
                    },
                    1000
                )
            } else {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".product__variations").offset().top -
                            $(".wrapper__container > .header").outerHeight(),
                    },
                    1000
                )
            }
        }
    })

    $(".product__variations").click((evt) => {
        if (evt.target.classList.contains("product__variations"))
            evt.target.classList.remove("on")
    })

    $("#popupCalculoFreteWrapper").on("click", function () {
        $(".product__shipping").addClass("on")
    })

    $("#calculoFrete").on("click", function (evt) {
        if ($(evt.target).attr("id") == "calculoFrete")
            $(".product__shipping").removeClass("on")
    })

    $(".product__description .product__title").click(function () {
        $(this)
            .closest(".product__description")
            .addClass("on")
    })

    $(".description-product__content").click(function (evt) {
        if ($(evt.target).hasClass("description-product__content")) {
            $(this)
                .closest(".product__description")
                .removeClass("on")
        }
    })

    $(".product__specification").on("click", ".attrs__title", function () {
        $(this)
            .closest(".product__specification")
            .addClass("on")
    })

    $(".product__specification").on("click", ".attrs__container", function (
        evt
    ) {
        if ($(evt.target).hasClass("attrs__container")) {
            $(this)
                .closest(".product__specification")
                .removeClass("on")
        }
    })

    // Atuazação do Sku do produto
    $vtex(window).on("skuSelected.vtex", (evt, productId, sku) => {
        setSkuID(sku.sku)
    })

    // Quando carrega o produto pega o sku
    vtexjs.catalog.getCurrentProductWithVariations().done(function (product) {
        setSkuID(product.skus[0].sku)
        initProduct(product.productId)
    })

    async function initProduct(id) {
        const product = await getProductById(id)
        // thumbs Video
        const video = product.Video
        if (video) {
            const src = $(video[0]).attr("src")
            const id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop()
            $(".thumbs").append(
                `<li class="video"><img src="//img.youtube.com/vi/${id}/0.jpg" /></li>`
            )
            $(".thumbs .video").on("click", function () {
                $("#include").toggleClass("on-play")
            })
            $(".thumbs li:not(.video)").on("click", function () {
                $("#include").removeClass("on-play")
            })
        }
        $("#include").append($('<div id="yotubeplay">').append(video))
        // thumbsCarousel();

        // Imagem descrição
        const image = product.Imagem
        let idProduto = ""

        vtexjs.catalog
            .getCurrentProductWithVariations()
            .done(function (product) {
                idProduto = product.productId
            })

        const urlPage = window.location.host
        const urlApi =
            "http://" +
            urlPage +
            "/api/catalog_system/pub/products/search?fq=productId:" +
            idProduto

        $(".buy__now-product").attr('data-id', idProduto)

        $.get(urlApi).done(function (data) {
            console.log(data)
            let tipo = data[0].Tipo
            let regiao = data[0].Regiao
            let produtor = data[0].Produtor
            let teor = data[0]['Teor Alcolico']
            let classificacao = data[0].Classificacao
            let volume = data[0].Volume
            let safra = data[0].Safra
            let temperatura = data[0]['Temperatura Ideal']
            let pais = data[0].Países

            $('<span class="pais__product ' + pais + '">' + pais + '</span>').appendTo('.product__image')

            let html = `<ul>
                <li class="tipo"><span><strong>Tipo</strong>${tipo}</span></li>
                <li class="regiao"><span><strong>Região</strong>${regiao}</span></li>
                <li class="produtor"><span><strong>Produtor</strong>${produtor}</span></li>
                <li class="teor"><span><strong>Teor Alcoólico</strong>${teor}</span></li>
                <li class="classificacao"><span><strong>Classificação</strong>${classificacao}</span></li>
                <li class="volume"><span><strong>Volume</strong>${volume}</span></li>
                <li class="safra"><span><strong>Safra</strong>${safra}</span></li>
                <li class="temperatura"><span><strong>Temperatura ideal</strong>${temperatura}</span></li>
                
            </ul>`

            if (html) {
                $('.attr__product-right').html(html)
            }

            let visual = data[0]['Analise Visual']
            let olfativo = data[0]['Analise Olfativa']
            let gustativo = data[0]['Analise Gustativa']

            let htmlSensor = `<h2>Análise Sensorial</h2><ul>
                <li>
                    <img src="/arquivos/visual.png"/>
                    <strong>Visual</strong>
                    <span>${visual}</span>
                </li>
                <li>
                    <img src="/arquivos/olfativo.png"/>
                    <strong> Olfativo </strong>
                    <span>${olfativo}</span>                
                </li>
                <li>
                    <img src="/arquivos/gustativo.png"/>
                    <strong> Gustativo </strong>                
                    <span>${gustativo}</span>
                </li>
            </ul>`

            if (htmlSensor) {
                $('.analise__sensorial').html(htmlSensor)
            }


            let harmohtml = data[0]['Harmonizações']


            harmohtml.forEach(function (i) {
                let imgUrl = i.replace(' ', '-').toLowerCase()
                let htmlItem = `<li><img src='/arquivos/${imgUrl}.png'/><strong>${i}</strong></li>`
                $('.product__harm ul').append(htmlItem)
            })

            if (!harmohtml) {
                $(".product__harm").hide()
            }

            let infoProd = data[0]['Infos do Produtor']
            if (infoProd) {
                $('.banner__produtor').html(infoProd)
            }


        })

        // thumbsCarousel()

        // Imagem descrição
        // const image = product.Imagem;
        if (image) {
            $(".product__specification-image").append(
                $('<div class="product__image-extra">').append(
                    `<img src="${image}" />`
                )
            )
        }
    }

    function thumbsCarousel() {
        // Carousel das miniaturas do produto
        $(".thumbs-two").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        vertical: false,
                        slidesToShow: 1,
                        arrows: false,
                        dots: true,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        vertical: false,
                        slidesToShow: 1,
                        arrows: false,
                        dots: true,
                    },
                },
            ],
        })
    }

    $(".product").on("click", ".showcase__title", function () {
        $(this)
            .closest(".showcase")
            .addClass("on")
    })

    $(".product").on("click", ".showcase__container > div > ul", function (evt) {
        if ($(evt.target).hasClass("slick-slider")) {
            $(this)
                .closest(".showcase")
                .removeClass("on")
        }
    })

    const buytobether = $("#divCompreJunto")
    if (buytobether.length) {
        const htmlBuyToBether = $.trim(buytobether.html())
        if (htmlBuyToBether != "") {
            buytobether
                .closest(".product__buytobether")
                .addClass("buytobether--actived")
        }
    }

    $(".product__link-more").click(function (evt) {
        const top =
            $(".product__title--description").offset().top -
            $("#header").outerHeight()

        $("body,html").animate(
            {
                scrollTop: top,
            },
            1000
        )
        evt.preventDefault()
    })

    function checkProduct() {
        $("body").removeClass("product--availabled")
        if (
            $(".buy-button.buy-button-ref")
                .attr("style")
                .indexOf("block") != -1
        ) {
            $("body").addClass("product--availabled")
        }

        setTimeout(function () {
            $(".video").on("click", function () {
                $("#include").toggleClass("on-play")
            })
            $("li:not(.video)").on("click", function () {
                $("#include").removeClass("on-play")
            })
        }, 1000)
    }

    checkProduct()

    function checkTicketProduct() {
        const discount = $(
            ".product__image .labels [class*=desconto-a-vista]:not(.on)"
        )
        const numberPattern = /\D/g

        if (
            !$(
                ".product__right--colunm:not([wholesale-prices]) .productPrice"
            ).hasClass("on")
        ) {
            const percent = $.trim(discount.text().replace(numberPattern, ""))
            const price = $.trim(
                $(".product__prices .price-best-price .skuBestPrice")
                    .text()
                    .replace("R$", "")
                    .replace(",", ".")
            )
            const total = price * ((100 - percent) / 100)
            const html = `<div class="prices__discount"><span class="price">R$ ${total
                .toFixed(2)
                .replace(".", ",")}</span>  á vista com desconto</div>`

            $(".product__right--colunm:not([wholesale-prices]) .productPrice")
                .append(html)
                .addClass("on")
        }
    }

    //checkTicketProduct();

    let discountDefault = 0

    function discountProgressive(qtd) {
        const label = $(".product__image .labels [class*=desconto-progressivo]")

        if (label) {
            const discount = $.trim(label.text().split("-")[1]).split(" ")

            $.each(discount, function (index, item) {
                const productDiscount = item.split("/")

                if (qtd < parseInt(productDiscount[0])) {
                    if (discountDefault != parseInt(productDiscount[0])) {
                        discountDefault = parseInt(productDiscount[0])
                        renderProgressiveHtml(
                            productDiscount[0],
                            productDiscount[1]
                        )
                    }
                    return false
                }
            })
        }
    }

    function renderProgressiveHtml(qtd, percent) {
        console.log(qtd, percent)
        const HTML = `<div class="progressive">
            <div class="progressive__container">
                <h3 class="progressive__title">Desconto Progressivo</h3>
                <p>Compre <strong>${qtd} UNIDADES</strong></p>
                <p>Ganhe <strong>${percent}% DE DESCONTO</strong></p>
            </div>
        </div>`
        $(".progressive").remove()
        $(".product__actions--button").before(HTML)
    }
    $(".qtds__input").on("qtds.change", function (evt, qtd) {
        var qtds = parseInt(qtd) || 1
        discountProgressive(qtds)
    })
    $(document).ajaxComplete(function () {
        checkTicketProduct()
        checkProduct()
    })

    //funcao foto na marca
    if ($(".brandName > a").length) {
        let brandName = $(".brandName > a").html()
        let newName = slug(brandName)
        let urlImg = "/arquivos/" + newName + ".png"
        $(".brandName > a ").append(
            '<img src="' + urlImg + '" alt="' + brandName + '"/>'
        )
    }

    // funcao foto na variacao
    if (
        $(".Selecioneacor .item-dimension-Selecioneacor .group_1 label").length
    ) {
        $(".Selecioneacor .item-dimension-Selecioneacor .group_1 label").each(
            function () {
                let variableName = $(this).html()
                let namevariableNew = "color-" + slug(variableName) + ".jpg"
                let urlImage = "/arquivos/" + namevariableNew
                $(this).css("background-image", "url(" + urlImage + ")")
            }
        )
    }

    if ($(".bread-crumb > ul").length) {
        $(".bread-crumb > ul")
            .clone()
            .appendTo(".item__extra .categorias")
    }

    if ($(".brandName > a").length) {
        $(".brandName > a")
            .clone()
            .appendTo(".item__extra .marca")
    }

    function getAttributeProdutct() {
        let idProduto = ""

        vtexjs.catalog
            .getCurrentProductWithVariations()
            .done(function (product) {
                idProduto = product.productId
            })

        const urlPage = window.location.host
        const urlApi =
            "http://" +
            urlPage +
            "/api/catalog_system/pub/products/search?fq=productId:" +
            idProduto

        $.get(urlApi).done(function (data) {
            let arrayCabelos = data[0]["Tipo de Cabelo"]
            let catFilter = data[0]["categories"]

            if (arrayCabelos != null) {
                arrayCabelos.forEach(function (itemRetorno) {
                    let urlFilter =
                        catFilter +
                        itemRetorno +
                        "?map=c,specificationFilter_19"
                    $(".item__extra .tipo ul").append(
                        '<li><a href="' +
                        urlFilter +
                        '">' +
                        itemRetorno +
                        "</a></li>"
                    )
                })
            }

            let arrayLinha = data[0]["Linha"]

            if (arrayLinha != null) {
                arrayLinha.forEach(function (itemRetorno) {
                    let urlFilter =
                        catFilter +
                        itemRetorno +
                        "?map=c,specificationFilter_19"
                    $(".item__extra .linha ul").append(
                        '<li><a href="' +
                        urlFilter +
                        '">' +
                        itemRetorno +
                        "</a></li>"
                    )
                })
            }
        })
    }

    getAttributeProdutct()

    if ($(window).width() < 992) {
        $(".productDescription").on("click", function () {
            $(this).toggleClass("on__text")
        })
    }

    function imagesThumb() {
        const thumbs = $("#show .thumbs:not(clone)")

        if (thumbs) {
            const clone = thumbs
                .clone()
                .removeClass("thumbs")
                .addClass("thumbs-two")
            $(".thumbs-two").remove()
            thumbs.addClass("clone").after(clone)
        }
    }

    const objectThumbs = document.querySelector(".thumbs")

    Object.observe(objectThumbs, function () {
        imagesThumb()
    })

    imagesThumb()

    $("#show").on("click", ".thumbs-two a", function () {
        const index =
            parseInt(
                $(this)
                    .closest(".slick-slide")
                    .attr("data-slick-index")
            ) + 1
        $(`#show .thumbs li:nth-child(${index}) a`).trigger("click")
    })
}

if (
    !$(".product__prices .product__description--short .productDescriptionShort")
        .length
) {
    $(".product__prices .product__description--short .description-title").hide()
}


$('.buy__now-product').on('click', function () {
    var idProduto = $(this).attr('data-id')
    var item = {
        id: idProduto,
        quantity: 1,
        seller: '1',
    }
    vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {
        $('body').addClass('add__toCar');
    })
})


$('button.button.button__minicart').on('click', function () {
    window.location.href = "/checkout/#/cart";
})

$('.product__buyOk--fechar').on('click', function () {
    $('body').removeClass('add__toCar');
})