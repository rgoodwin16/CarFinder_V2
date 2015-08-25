/*-----------------------------------------------------------------------------------------------
Project:  Mos7 - Responsive Bootstrap 3 App Landing Page Template
Version:  1.5.2
Last change:  25/06/2015
Design by:  TemplatesPRO.com.br

Script (line):
- WINDOW.LOAD (36)
  1) Preloader (42)

- DOCUMENT.READY (50)
  2) Scrollbar (54)
  3) Component Slideshow - Adjustable Dimensions (68)
  4) Component Stats and Call To Action - Background-size fix iOS (90)
  5) Component Slideshow - Carousel (100)
  6) Component Slideshow - Countdown (107)
  7) Component Slideshow - Subscription to Trial (134)
  8) Component Slideshow - Modal Subscription to Trial (185)
  9) Navbar Fixed to Top (236)
  10) ScrollTo - Navigation (245)
  11) Component Gallery - Carousel (259)
  12) Component Testimonials - Carousel (286)
  13) Animations and Component Stats - Circles Stats (310)
      - Circles Stats (338)
  14) Newsletter - Mailchimp Ajax Subscription (424)
  15) Component Contact - Send Ajax (442)
  16) Tooltips (498)
  17) Close Modal Video (503)
  18) Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 Fix (510)

- WINDOW.SCROLL (526)
  19) Parallax Effect (530)
  20) Go Top - Scroll (540)
-----------------------------------------------------------------------------------------------*/

$(window).load(function () {
  "use strict";

  $('html, body').animate({scrollTop: 0}, 1); // go to top in refresh

  /***********************************************************************************************
   1) Preloader
   ***********************************************************************************************/
  $(".status").fadeOut(); // will first fade out the loading animation
  $(".preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.

});


$(document).ready(function () {
  "use strict";

  /***********************************************************************************************
   2) ScrollBar
   ***********************************************************************************************/
  $("html").niceScroll({
    cursorcolor: "#777",
    cursoropacitymax: 0.7,
    cursorwidth: "9",
    cursorborder: "none",
    cursorborderradius: "10px",
    background: "#ccc",
    zindex: "9999999",
    touchbehavior: false
  });

  /***********************************************************************************************
   3) Component Slideshow - Adjustable Dimensions
   ***********************************************************************************************/
  function slideshowFit() {
    var slideshowWidth = $(window).width(),
        slideshowHeight = $(window).height() - 46;

    $(".slideshow .item").css('min-height', slideshowHeight);

    if (slideshowWidth > slideshowHeight) { // Landascape
      $(".slideshow .bg-item").removeAttr('style');
      $(".slideshow .bg-item").css('min-width', slideshowWidth);
    } else {                                // Portrait
      $(".slideshow .bg-item").removeAttr('style');
      $(".slideshow .bg-item").css('max-height', slideshowHeight);
      $(".slideshow .bg-item").css('max-width', 'initial');
    }
  }

  slideshowFit();
  $(window).on('resize', slideshowFit);

  /***********************************************************************************************
   4) Component Stats and Call To Action - Background-size fix iOS
   ***********************************************************************************************/
  var userAgent = window.navigator.userAgent;

  if (/iP(hone|od|ad)/.test(userAgent)) {
    $(".stats .bg-section").css('display', 'block');
    $(".calltoaction .bg-section").css('display', 'block');
  }

  /***********************************************************************************************
   5) Component Slideshow - Carousel
   ***********************************************************************************************/
  $('#slideshow-carousel-1').carousel({
    interval: 10000
  });

  /***********************************************************************************************
   6) Component Slideshow - Countdown
   ***********************************************************************************************/
  $('.countdown').countdown('2015/12/31', function (event) {  // Enter your event date (aaaa/mm/dd)
    var $this = $(this).html(event.strftime(''
      + '<div class="c1 col-xs-6 col-sm-3">'
      +   '<div class="count count-days center-block">'
      +     '<strong>%-D</strong><span>days</span>'
      +   '</div>'
      + '</div>'
      + '<div class="c1 col-xs-6 col-sm-3">'
      +   '<div class="count count-hours center-block">'
      +     '<strong>%H</strong><span>hours</span>'
      +   '</div>'
      + '</div>'
      + '<div class="c1 col-xs-6 col-sm-3">'
      +   '<div class="count count-minutes center-block">'
      +     '<strong>%M</strong><span>minutes</span>'
      +   '</div>'
      + '</div>'
      + '<div class="c1 col-xs-6 col-sm-3">'
      +   '<div class="count count-seconds center-block">'
      +     '<strong>%S</strong><span>seconds</span>'
      +   '</div>'
      + '</div>'));
  });

  /***********************************************************************************************
   7) Component Slideshow - Subscription to Trial
   ***********************************************************************************************/
  $(".submit-form-trial").on('click', function () {
    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields
    $(".trial-form input[required=true]").each(function () {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty
        $(this).css('border-color', '#d9534f'); //change border color to red
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', '#d9534f'); //change border color to red
        proceed = false; //set do not proceed flag
      }
    });

    if (proceed) { //everything looks good! proceed...
      //get input field values data to be sent to server
      var post_data = {
        'user_trial_name' : $('input[name=trial-name]').val(),
        'user_trial_email': $('input[name=trial-email]').val(),
        'user_trial_phone': $('input[name=trial-phone]').val()
      };

      //Ajax post data to server
      $.post('subscription_trial.php', post_data, function (response) {
        if (response.type === 'error') { //load json data from server and output message
          var output = '<div class="alert alert-danger alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Error:&nbsp;&nbsp;</strong>' + response.text + '</div>';
          $(".alerts-trial").hide().html(output).slideDown();
        } else {
          var output = '<div class="alert alert-success alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!&nbsp;&nbsp;</strong>' + response.text + '</div>';
          //reset values in all input fields
          $(".trial-form input").val('');
          $(".alerts-trial").hide().html(output).slideDown();
          $('.alerts-trial').delay(10000).slideUp();
        }
      }, 'json');
    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $(".trial-form input[required=true]").keyup(function () {
    $(this).css('border-color', '');
    $(".alerts-contact").slideUp();
  });

  /***********************************************************************************************
   8) Component Slideshow - Modal Subscription to Trial
   ***********************************************************************************************/
  $(".submit-modal-form-trial").on('click', function () {
    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields
    $(".modal-trial-form input[required=true]").each(function () {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty
        $(this).css('border-color', '#d9534f'); //change border color to red
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', '#d9534f'); //change border color to red
        proceed = false; //set do not proceed flag
      }
    });

    if (proceed) { //everything looks good! proceed...
      //get input field values data to be sent to server
      var post_data = {
        'user_modal_trial_name' : $('input[name=modal-trial-name]').val(),
        'user_modal_trial_email': $('input[name=modal-trial-email]').val(),
        'user_modal_trial_phone': $('input[name=modal-trial-phone]').val()
      };

      //Ajax post data to server
      $.post('modal_subscription_trial.php', post_data, function (response) {
        if (response.type === 'error') { //load json data from server and output message
          var output = '<div class="alert alert-danger alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Error:&nbsp;&nbsp;</strong>' + response.text + '</div>';
          $(".alerts-trial-modal").hide().html(output).slideDown();
        } else {
          var output = '<div class="alert alert-success alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!&nbsp;&nbsp;</strong>' + response.text + '</div>';
          //reset values in all input fields
          $(".modal-trial-form input").val('');
          $(".alerts-trial-modal").hide().html(output).slideDown();
          $('.alerts-trial-modal').delay(10000).slideUp();
        }
      }, 'json');
    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $(".modal-trial-form input[required=true]").keyup(function () {
    $(this).css('border-color', '');
    $(".alerts-contact").slideUp();
  });

  /***********************************************************************************************
   9) Navbar Fixed to Top
   ***********************************************************************************************/
  $('.navbar').affix({
    offset: {
      top: $(window).height() - $('.navbar').height() - 2
    }
  });

  /***********************************************************************************************
   10) ScrollTo - Navigation
   ***********************************************************************************************/
  $('a[href^="#anch"]').on('click', function (event) {
    var target = $($(this).attr('href'));

    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  /***********************************************************************************************
   11) Component Gallery - Carousel
   ***********************************************************************************************/
  $('#gallery-carousel-1').slick({
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  /***********************************************************************************************
   12) Component Testimonials - Carousel
   ***********************************************************************************************/
  $('#testimonials-carousel-1').carousel({
    interval: 10000
  });

  function testimonialControl() {
    var $testimonial = $('.testimonials'),
        windowTop = $(window).scrollTop(),
        testimonialTop = $testimonial.offset().top,
        testimonialBottom = testimonialTop + $testimonial.height();

    if (testimonialBottom <= windowTop) {
      $('#testimonials-carousel-1').carousel('pause');
    } else {
      $('#testimonials-carousel-1').carousel('cycle');
    }
  }

  $(window).scroll(function () {
    testimonialControl();
  });

  /***********************************************************************************************
   13) Animations and Component Stats - Circles Stats
   ***********************************************************************************************/
  $(function () {
    var $elems = $('.animateblock'),
        windowHeight = $(window).height(),
        fullHeight = $(document).height();

    function animateElems() {
      var windowTop = $(window).scrollTop(); // calculate distance from top of window

      // loop through each item to check when it animates
      $elems.each(function () {
        var $elm = $(this);

        if ($elm.hasClass('animated')) {
          return true;
        } // if already animated skip to the next item

        var topCoords = $elm.offset().top; // element's distance from top of page in pixels

        function getWidth() {
          return window.innerWidth / 14;  // for responsive circles
        }

        if (windowTop > (topCoords - (windowHeight * 0.7))) {
          // animate when top of the window is 3/4 above the element
          $elm.addClass('animated');

          /*** Circles Stats ***/
          if ($elm.hasClass('circle')) {
            // animate circles stats
            var circle1 = Circles.create({
              id: 'circle-1',
              radius: getWidth(),
              value: 25,  // Set the first percentage here
              maxValue: 100,
              width: 18,
              text: function (value) {
                return value + '%';
              },
              colors: ['#7a8691', '#d9534f'],
              duration: 1200,
              wrpClass: 'circles-wrp',
              textClass: 'circles-text',
              styleWrapper: true,
              styleText:    true
            });
            var circle2 = Circles.create({
              id: 'circle-2',
              radius: getWidth(),
              value: 50,  // Set the second percentage here
              maxValue: 100,
              width: 18,
              text: function (value) {
                return value + '%';
              },
              colors: ['#7a8691', '#d9534f'],
              duration: 1200,
              wrpClass: 'circles-wrp',
              textClass: 'circles-text',
              styleWrapper: true,
              styleText:    true
            });
            var circle3 = Circles.create({
              id: 'circle-3',
              radius: getWidth(),
              value: 75,  // Set the third percentage here
              maxValue: 100,
              width: 18,
              text: function (value) {
                return value + '%';
              },
              colors: ['#7a8691', '#d9534f'],
              duration: 1200,
              wrpClass: 'circles-wrp',
              textClass: 'circles-text',
              styleWrapper: true,
              styleText:    true
            });
            var circle4 = Circles.create({
              id: 'circle-4',
              radius: getWidth(),
              value: 100,  // Set the fourth percentage here
              maxValue: 100,
              width: 18,
              text: function (value) {
                return value + '%';
              },
              colors: ['#7a8691', '#d9534f'],
              duration: 1200,
              wrpClass: 'circles-wrp',
              textClass: 'circles-text',
              styleWrapper: true,
              styleText:    true
            });
            window.onresize = function (e) {
              circle1.updateRadius(getWidth());
              circle2.updateRadius(getWidth());
              circle3.updateRadius(getWidth());
              circle4.updateRadius(getWidth());
            };
          }

        }
      });
    } // end animateElems()

    $(window).scroll(function () {
      animateElems();
    });

  });

  /***********************************************************************************************
   14) Newsletter - Mailchimp Ajax Subscription
   ***********************************************************************************************/
  $('.subscription-mailchimp').ajaxChimp({
    callback: mailchimpCallback,
    //Replace this url with your own mailchimp post URL
    url: "http://templatespro.us10.list-manage.com/subscribe/post?u=e1b67e42c0c37f1e5eb1c76c6&amp;id=17c3681cdf"
  });

  function mailchimpCallback(resp) {
    if (resp.result === 'success') {
      $('.alerts-newsletter').hide().html('<div class="alert alert-success alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!&nbsp;&nbsp;</strong>' + resp.msg + '</div>').slideDown();
      $('.alerts-newsletter').delay(10000).slideUp();
    } else if (resp.result === 'error') {
      $('.alerts-newsletter').hide().html('<div class="alert alert-danger alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Error:&nbsp;&nbsp;</strong>' + resp.msg + '</div>').slideDown();
    }
  }

  /***********************************************************************************************
   15) Component Contact - Send Ajax
   ***********************************************************************************************/
  $(".submit-form-contact").on('click', function () {
    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields
    $(".contact-form input[required=true], .contact-form textarea[required=true]").each(function () {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty
        $(this).css('border-color', '#d9534f'); //change border color to red
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', '#d9534f'); //change border color to red
        proceed = false; //set do not proceed flag
      }
    });

    if (proceed) { //everything looks good! proceed...
      //get input field values data to be sent to server
      var post_data = {
        'user_fname'  : $('input[name=fname]').val(),
        'user_lname'  : $('input[name=lname]').val(),
        'user_email'  : $('input[name=email]').val(),
        'user_phone'  : $('input[name=phone]').val(),
        'user_company': $('input[name=company]').val(),
        'user_website': $('input[name=website]').val(),
        'subject'     : $('input[name=subject]').val(),
        'msg'         : $('textarea[name=message]').val()
      };

      //Ajax post data to server
      $.post('contact.php', post_data, function (response) {
        if (response.type === 'error') { //load json data from server and output message
          var output = '<div class="alert alert-danger alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Error:&nbsp;&nbsp;</strong>' + response.text + '</div>';
          $(".alerts-contact").hide().html(output).slideDown();
        } else {
          var output = '<div class="alert alert-success alert-dismissible" role="alert"><button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Success!&nbsp;&nbsp;</strong>' + response.text + '</div>';
          //reset values in all input fields
          $(".contact-form input, .contact-form textarea").val('');
          $(".alerts-contact").hide().html(output).slideDown();
          $('.alerts-contact').delay(10000).slideUp();
        }
      }, 'json');
    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $(".contact-form input[required=true], .contact-form textarea[required=true]").keyup(function () {
    $(this).css('border-color', '');
    $(".alerts-contact").slideUp();
  });

  /***********************************************************************************************
   16) Tooltips
   ***********************************************************************************************/
  $('a[data-toggle=tooltip]').tooltip();

  /***********************************************************************************************
   17) Close Modal Video
   ***********************************************************************************************/
  $('#modal-slide-video').on('hidden.bs.modal', function (e) {
    $("#modal-slide-video iframe").attr("src", $("#modal-slide-video iframe").attr("src"));
  });

  /***********************************************************************************************
   18) Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 Fix
   ***********************************************************************************************/
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style');

      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      );
      document.querySelector('head').appendChild(msViewportStyle);
    }

});


$(window).scroll(function () {
  "use strict";

  /***********************************************************************************************
   19) Parallax Effect
   ***********************************************************************************************/
  $('.parallax').each(function () {
    var $obj = $(this),
        yPos = (($(window).scrollTop() / $obj.data('speed')) / 2),
        bgPos = yPos + 'px';
    $obj.css('top', bgPos);
  });

  /***********************************************************************************************
   20) Go Top - Scroll
   ***********************************************************************************************/
  if ($(this).scrollTop() > 100) {
    $('.go-top').fadeIn();
  } else {
    $('.go-top').fadeOut();
  }

});
