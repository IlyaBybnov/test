jQuery(function($){
    "use strict";

    $('.testimonials__body-text').liTextLength({
      length: 140,        //Видимое кол-во символов
      afterLength: '...', //Текст после видимого содержания   
      fullText:true,      //Добавить ссылку для отображения скрытого текста
      moreText: '<br>Read more!',  //Текст ссылки до показа скрытого содержания
      lessText: '<br>Hidden'   //Текст ссылки после показа скрытого содержания
    });
    $('.testimonials__body-description').liTextLength({
      length: 550,        //Видимое кол-во символов
      afterLength: '...', //Текст после видимого содержания   
      fullText:true,      //Добавить ссылку для отображения скрытого текста
      moreText: '<br>Read more!',  //Текст ссылки до показа скрытого содержания
      lessText: '<br>Hidden'   //Текст ссылки после показа скрытого содержания
    });


    let sections = $('section'), 
    nav = $('.header__nav'), 
    nav_height = nav.outerHeight();
    $(window).on('scroll', function () {
        $('.header__menu-link').removeClass('active');
        $('.header__burger').removeClass('active');
        $('.header__nav').removeClass('active');
        $('body').removeClass('lock');
        let cur_pos = $(this).scrollTop(); 
        sections.each(function() {
            let top = $(this).offset().top - nav_height - 100,
            bottom = top + $(this).outerHeight();       
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('.header__menu-link').removeClass('active');
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
            scrollTop: $(id).offset().top - nav_height
        }, 600);
        return false;
    });


    $('.testimonials__body-images').magnificPopup({
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


    $('.header__burger').click(function(event){
        $('.header__burger, .header__nav').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.home-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
      });

    $('.video-box__link').magnificPopup({
        disableOn: 0,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
    });

    $('.carousel__shop').slick({
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,

        appendArrows: $('.carousel-arrow'),
        prevArrow: $('.carousel-arrow__left'),
        nextArrow: $('.carousel-arrow__right'),

        responsive: [
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
    });

    $('.testimonials-box').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.testimonials__authors-box'
    });
    $('.testimonials__authors-box').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.testimonials-box',
      dots: false,
      //centerMode: true,
      focusOnSelect: true,
      arrows: true,

      appendArrows: $('.testimonials-arrow'),
      prevArrow: $('.testimonials__authors-arleft'),
      nextArrow: $('.testimonials__authors-arright'),

      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 430,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });
    /*
    $('.twits__slider-messages').slick({
      arrows: true,
      dots: false,
      infinite: true,
      vertical: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,*/

      $('.twits__info').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.twits__slider-messages'
      });
      $('.twits__slider-messages').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.twits__info',
        vertical: true,
        dots: false,
        //centerMode: true,
        arrows: true,

      appendArrows: $('.twits__slider-arrows'),
      prevArrow: $('.twits__slider-arrows-up'),
      nextArrow: $('.twits__slider-arrows-down'),
  });
});


let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

let body=document.querySelector('body');
if(isMobile.any()){
    body.classList.add('touch');

    let navArrow=document.querySelectorAll('.arrow-menu');
    for(i=0; i<navArrow.length; i++){
        let thisArrow=navArrow[i];
        let subMenu=navArrow[i].nextElementSibling;
        let thisLink=navArrow[i].previousElementSibling;

        navArrow[i].addEventListener('click', function(){
            thisArrow.classList.toggle('active');
            subMenu.classList.toggle('active');
            thisLink.classList.toggle('parent');
        });
    }

}else{
    body.classList.add('mouse');
}
