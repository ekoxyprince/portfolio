/*========================================================================
EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Template Name   : Loria
Author          : Themepaa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Copyright (c) 2018 - Themepaa
========================================================================*/


(function($) {
    "use strict"
    var LOA = {};

    /*--------------------
      * Pre Load
    ----------------------*/
    LOA.WebLoad = function() {
        document.getElementById("loading").style.display = "none";
    }


    /*--------------------
    * owl Slider
    ----------------------*/

    LOA.ClientSlider = function() {
            var testimonials_slider = $('#client-slider-single');
            testimonials_slider.owlCarousel({
                loop: true,
                margin: 30,
                nav: false,
                items: 1
            });
        }
        /*--------------------
        * owl Slider
        ----------------------*/
    LOA.BlogSlider = function() {
        var testimonials_slider = $('#portfolio-slider-single');
        testimonials_slider.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                991: {
                    items: 2
                },
                1140: {
                    items: 3
                }
            }
        });
    }


    /*--------------------
    * Isotope
    ----------------------*/
    LOA.MasoNry = function() {
        var portfolioWork = $('.portfolio-content');
        $(portfolioWork).isotope({
            resizable: false,
            itemSelector: '.portfolio-item',
            layoutMode: 'masonry',
            filter: '*'
        });
        //Filtering items on portfolio.html
        var portfolioFilter = $('.filter li');
        // filter items on button click
        $(portfolioFilter).on('click', function() {
            var filterValue = $(this).attr('data-filter');
            portfolioWork.isotope({ filter: filterValue });
        });
        //Add/remove class on filter list
        $(portfolioFilter).on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
    }


    LOA.PopupVideo = function() {
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    LOA.LightboxGallery = function() {
        $('.portfolio-col').magnificPopup({
            delegate: '.lightbox-gallery',
            type: 'image',
            tLoading: '#%curr%',
            mainClass: 'mfp-fade',
            fixedContentPos: true,
            closeBtnInside: true,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            }
        });
    }

    LOA.mTypeIt = function() {
        new TypeIt('#type-it', {
            speed: 200,
            loop: true,
            strings: [
                'Designer',
                'Developer'
            ],
            breakLines: false
        });
    }


    // Window on Load
    $(window).on("load", function() {
        LOA.MasoNry(),
            LOA.WebLoad();
    });

    $(document).ready(function() {
        LOA.ClientSlider(),
            LOA.BlogSlider(),
            LOA.MasoNry(),
            LOA.PopupVideo(),
            LOA.LightboxGallery(),
            LOA.mTypeIt();
    });

    $(document).ready(function() {
        $('#form').on('submit', function(e) {
            e.preventDefault();
            let name = $("#name").val();
            let email = $("#email").val();
            let message = $("#message").val();
            $.ajax({
                url: "/",
                type: "POST",
                content: "application/json",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                success: function(res) {
                    $("h4").html(res.response);

                }
            })
        })
    })


})(jQuery);