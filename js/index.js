$(document).ready(function(){
    $('.slider__inner').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src = "../img/logo/arr-left.png"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src = "../img/logo/arr-right.png"</button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                autoplay: false,
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 425,
              settings: {
                autoplay: true,
                dots: false,
                arrows: false
              }
            },
          ]
    });
    
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  $(".catalog-item__link").each(function(i){
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    } );
  })
  $(".catalog-item__back").each(function(i){
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    } );
  })

  // Modal 

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  })

  $('.button_card').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');

    });
  })
 
  function validateForm(form) {
    $(form).validate({
      rules:{
        name: "required",
        phone: "required",
        email:{
          required: true,
          email: true
        }
      }
    });
  }
  validateForm('#consultation-form');
  validateForm('#consultation form');
  validateForm('#order form');
  $('input[name=phone]').mask("+420(999)-999-999");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
        $(this).find('input').val('');

        $('form').trigger('reset');
      })
    return false;
    
  })
  
});