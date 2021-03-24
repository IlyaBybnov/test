jQuery(function($){
    "use strict";
    $('.header__burger').click(function(event){
        $('.header__burger, .header__top-nav, .header__home').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.references-item__text').liTextLength({
      length: 500,        //Видимое кол-во символов
      afterLength: '...', //Текст после видимого содержания   
      fullText:true,      //Добавить ссылку для отображения скрытого текста
      moreText: '<br>Read more',  //Текст ссылки до показа скрытого содержания
      lessText: '<br>Hidden'   //Текст ссылки после показа скрытого содержания
    });
/*
    $('.works-gallery__item').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
          verticalFit: true
        }
      });*/
      $('.works-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
          }
        }
      });
});

let sections = $('section'), 
nav = $('.main-nav'), 
nav_height = nav.outerHeight();
$(window).on('scroll', function () {
    $('.main-nav__link').removeClass('active');
    $('.header__burger').removeClass('active');
    $('.header__top-nav').removeClass('active');
    $('.header__home').removeClass('active');
    $('body').removeClass('lock');
    let cur_pos = $(this).scrollTop(); 
    sections.each(function() {
        let top = $(this).offset().top - nav_height - 100,
        bottom = top + $(this).outerHeight();       
        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('main-nav__link').removeClass('active');
            sections.removeClass('active');    
            $(this).addClass('active');
            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
    });
});
nav.find('a').on('click', function () {
    let $el = $(this), 
    id = $el.attr('href'); 
    $('html, body').animate({
        //scrollTop: $(id).offset().top - nav_height + 24
        scrollTop: $(id).offset().top
    }, 600);
    return false;
});



$('body').append('<div class="upbtn"><i class="fas fa-angle-double-up"></i></div>');
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.upbtn').css({
            transform: 'scale(1)'
        });
        } else {
        $('.upbtn').css({
            transform: 'scale(0)'
        });
    }
});
$('.upbtn').on('click',function() {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    $('.upbtn').css({
            transform: 'scale(0)'
        });
    return false;
});

$('body')
    .one('focus.textarea', '#contact-form-message', function(e) {
        baseH = this.scrollHeight;
    })
    .on('input.textarea', '#contact-form-message', function(e) {
        if(baseH < this.scrollHeight) {
            $(this).height(0).height(this.scrollHeight);
        }
        else {
            $(this).height(0).height(baseH);
        }
    });

