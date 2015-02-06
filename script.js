// scroll function
scroll = function(endY, duration) {
    endY = endY || ($.os.android ? 1 : 0);
    duration = duration || 200;

    var startY = document.body.scrollTop,
        startT  = +(new Date()),
        finishT = startT + duration;

    var interpolate = function (source, target, shift) { 
        return (source + (target - source) * shift); 
    };

    var easing = function (pos) { 
        return (-Math.cos(pos * Math.PI) / 2) + .5; 
    };

    var animate = function() {
        var now = +(new Date()),
            shift = (now > finishT) ? 1 : (now - startT) / duration;

        window.scrollTo(0, interpolate(startY, endY, easing(shift)));

        (now > finishT) || setTimeout(animate, 15);
    };

    animate();
};

// disable/enable scroll function
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

// general jquery
$(document).ready(function() {

  $('#bar-toggle').mouseenter( function() {
    $('#bar-toggle .titlebar:nth-child(1)').addClass('shake', 100);
    setTimeout(function() {
      $('#bar-toggle .titlebar:nth-child(1)').removeClass('shake', 100);
    }, 75);
    setTimeout(function() {
      $('#bar-toggle .titlebar:nth-child(2)').addClass('shake', 100);
    }, 75);
    setTimeout(function() {
      $('#bar-toggle .titlebar:nth-child(2)').removeClass('shake', 100);
    }, 150);
    setTimeout(function() {
      $('#bar-toggle .titlebar:nth-child(3)').addClass('shake', 100);
    }, 150);
    setTimeout(function() {
      $('#bar-toggle .titlebar:nth-child(3)').removeClass('shake', 100);
    }, 225);
  });


  $(window).scroll(function() {
    s = $(window).scrollTop();
    // the about me text
    $('.header h1').css('-webkit-transform', 'translateX(' + (s/2) +'px)');
    $('.header h2').css('-webkit-transform', 'translateX(' + (s/-3) +'px)');
    $('.header p').css('-webkit-transform', 'translateX(' + (s/7) +'px)');
    // background images
    // $('#background img').css('-webkit-filter', 'grayscale(' + (s/6) +'%)');
    $('#background img').css('-webkit-transform', 'translateY(' + (s/-8) +'px)');
    // the project divs
    $('.project').css('-webkit-transform', 'translateX(' + (s/8) +'px)');
    $('.project:nth-child(3)').css('-webkit-transform', 'translateX(' + (s/-8) +'px)');
    $('.project:nth-child(5)').css('-webkit-transform', 'translateX(' + (s/-8) +'px)');
  });

  // for about pictures
  $('.about-pic img').mouseleave( function() {
    $(this).css('opacity', '0.7');
    $(this).closest( "div" ).children( ".about-text" ).css( "transform", "rotate(-20deg)" );
  });

  $('.about-pic img').mouseenter( function() {
    $(this).css('opacity', '1');
    $(this).closest( "div" ).children( ".about-text" ).css( "transform", "rotate(0deg)" );
  });

  // for project pictures
  $('.project img').mouseenter( function() {
    var that = $(this);
    $(this).css('opacity', '0.2');
    $(this).closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(1)').css( "margin-left", "200px" ).css('opacity', '1');
    $(this).closest( "div" ).children('.desc-wrapper').children('p').css( "margin-right", "200px" ).css('opacity', '1');
    setTimeout(function() {
      that.closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(2)').css( "margin-left", "200px" ).css('opacity', '1');
    }, 100);
    setTimeout(function() {
      that.closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(3)').css( "margin-left", "200px" ).css('opacity', '1');
    }, 200);
    setTimeout(function() {
      that.closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(4)').css( "margin-left", "200px" ).css('opacity', '1');
    }, 300);
  });

  $('.project img').mouseleave( function() {
    var that = $(this);
    $(this).closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(1)').css( "margin-left", "-100px" ).css('opacity', '0');
    $(this).closest( "div" ).children('.desc-wrapper').children('p').css( "margin-right", "-100px" ).css('opacity', '0');
    setTimeout(function() {
      that.closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(2)').css( "margin-left", "-100px" ).css('opacity', '0');
    }, 100);
    setTimeout(function() {
      that.closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(3)').css( "margin-left", "-100px" ).css('opacity', '0');
    }, 200);
    setTimeout(function() {
      that.closest( "div" ).children('.atts-wrapper').children('.project-atts:nth-child(4)').css( "margin-left", "-100px" ).css('opacity', '0');
    }, 300);
    setTimeout(function() {
      that.css('opacity', '1');
    }, 300)
  });


  // for the damn menubar
  $('#bar-toggle').on('click', function() {
    $('.menu .menubar:nth-child(1)').toggleClass('menuleft', 500)
    $('.menu .menubar:nth-child(2)').toggleClass('menuleft', 600)
    $('.menu .menubar:nth-child(3)').toggleClass('menuleft', 700)
    $('.menu .menubar:nth-child(4)').toggleClass('menuleft', 800)
  });

  $('.menubar').mouseenter( function() {
    $(this).children('p').first().addClass('flip', 300)
  });

  $('.menubar').mouseleave( function() {
    $(this).children('p').first().removeClass('flip', 300)
  });

  // projects scroll
  $('.menu .menubar:nth-child(1)').on('click', function() {
    $("html, body").animate({scrollTop: $('.container.projects').height()}, 2000);
    $(".skills").removeClass('show-skills');
    enable_scroll();
    $('span').css('height', '0%')
    off = false;
    $(".titlebar:nth-child(1)").removeClass('cross-top');
    $(".titlebar:nth-child(2)").removeClass('cross-mid');
    $(".titlebar:nth-child(3)").removeClass('cross-bottom');
  });

  // about me scroll
  $('.menu .menubar:nth-child(2)').on('click', function() {
    $("html, body").animate({scrollTop: $('.container.about').height()}, 1500);
    $(".skills").removeClass('show-skills');
    enable_scroll();
    $('span').css('height', '0%')
    off = false;
    $(".titlebar:nth-child(1)").removeClass('cross-top');
    $(".titlebar:nth-child(2)").removeClass('cross-mid');
    $(".titlebar:nth-child(3)").removeClass('cross-bottom');
  });

  // contact scroll
  $('.menu .menubar:nth-child(4)').on('click', function() {
    $("html, body").animate({scrollTop: $(document).height()}, 2500);
    $(".skills").removeClass('show-skills');
    enable_scroll();
    $('span').css('height', '0%')
    off = false;
    $(".titlebar:nth-child(1)").removeClass('cross-top');
    $(".titlebar:nth-child(2)").removeClass('cross-mid');
    $(".titlebar:nth-child(3)").removeClass('cross-bottom');
  });

  // education/skills click
  var off = false;
  $('.menu .menubar:nth-child(3)').on('click', function() {
    $(".skills").toggleClass('show-skills');
    $(".titlebar:nth-child(1)").toggleClass('cross-top');
    $(".titlebar:nth-child(2)").toggleClass('cross-mid');
    $(".titlebar:nth-child(3)").toggleClass('cross-bottom');
    if (off === false) {
      disable_scroll();
      $('li:nth-child(1) span').css('height', '35%')
      $('li:nth-child(2) span').css('height', '60%')
      $('li:nth-child(3) span').css('height', '52%')
      $('li:nth-child(4) span').css('height', '60%')
      $('li:nth-child(5) span').css('height', '37%')
      $('li:nth-child(6) span').css('height', '54%')
      $('li:nth-child(7) span').css('height', '40%')
      off = true;
    } else if (off === true) {
      enable_scroll();
      $('span').css('height', '0%')
      off = false;
    }
  });

  // school image shuffle
  setInterval(function(){ 
    $('.school:nth-child(2) img').fadeToggle("slow", "linear"); 
    $('.school:nth-child(1) .school-name').toggleClass("blurred-name", 700); 
    $('.school:nth-child(2) .school-name').toggleClass("blurred-name", 700);
  }, 5000);

});











