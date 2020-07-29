var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}



if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}


$(document).ready(function () {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  $('.has-submenu').click(function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
  });

  $('.photo-block__link').click(function (e) {
    // e.preventDefault();
    $(this).find('input')[0].click();
  });

  $('.photo-block__link input[type="file"]').change(function () {
    if($(this).val() == ''){
      return;
    }
    readURL(this);
    $(this).parent().hide();
  });

  function readURL(input) {
    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(input.files[0]); // convert to base64 string

      reader.onload = function(e) {
        $(input).parent().next().addClass('active').find('.selected-photo__item').html('<img src="'+reader.result+'" />');
      }
    }
  }

  $('.selected-photo__remove').click(function () {
    $(this).closest('.photo-block__item').find('input[type="file"]').val('');
    $(this).parent().removeClass('active').prev().show();
  });

  $('.post-article').click(function (e) {
    var validate = true;

    if($('.tab-pane.active input').val().length == 0){
      validate = false;
      $('.tab-pane.active input').closest('.tab-content').prev().find('.nav-link.active').addClass('novalid');
      $('.tab-pane.active input').addClass('novalid');
      //
    }
    if($('.tab-pane.active textarea').val().length == 0){
      $('.tab-pane.active textarea').closest('.tab-content').prev().find('.nav-link.active').addClass('novalid');
      $('.tab-pane.active textarea').addClass('novalid');
      validate = false;
    }

    $('.category-block').each(function () {
      if($(this).find('.custom-control-input:checked').length == 0){
        $(this).find('.category-block__checkboxes').addClass('novalid-category');
        validate = false;
      }
    });

    if(!validate){
      e.preventDefault();
    }
  });

  $(document).on('click', '.form-control.novalid', function () {
    $(this).removeClass('novalid');
    $(this).closest('.tab-content').prev().find('.nav-link.novalid').removeClass('novalid');
  });

  $(document).on('change', '.category-block__checkboxes.novalid-category input[type="checkbox"]', function () {
    $(this).closest('.novalid-category').removeClass('novalid-category');
  });

  $('.textarea-length').each(function () {
    var span = $(this);
    var spanLength = parseInt(span.attr('data-length'));


    $(this).prev().keyup(function () {
      if($(this).val().length <= spanLength){
        span.html($(this).val().length + '/' + spanLength);
      } else {
        $(this).val($(this).val().substring(0, $(this).val().length - 1));
      }

    });
  });

  $('.login-page__show-pass').click(function () {
    var type = $(this).prev().attr('type');
    if(type == 'password'){
      $(this).prev().attr('type', 'text');
    } else {
      $(this).prev().attr('type', 'password');
    }
  });

  $('.login-page__btn').click(function (e) {

    if($(this).closest('form').find(':invalid').length === 0){
      e.preventDefault();
      location.href = './index1.html'
    }
  });

  $('.site-search form').submit(function (e) {
    e.preventDefault();
    $('.not-found-js').modal('toggle');
  });

  $('.menu__settings-link').hover(function () {
    $('body').addClass('settings-hover');
  }, function () {
    setTimeout(function () {
      $('body').removeClass('settings-hover');
    }, 500);
  });

  // var bLazy = new Blazy({
  //   src: 'data-blazy' // Default is data-src
  // });

  // var bLazy = new Blazy({
  //   src: 'data-blazy'
  // });

  // checking browser for WEBP
  hasWebP().then(function () {

    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var webp = $(this).data('webp');
        $(this).attr('data-blazy', webp);
      });
    } else {
      $('.webp-img').each(function () {
        var webp;
        if($(this).data('webp-mobile') !== undefined)
          webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
        console.log($(this).data('webp-mobile'));
        $(this).attr('data-blazy', webp);
      });
    }

    bLazy.revalidate();

  }, function () {
    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    } else {
      $('.webp-img').each(function () {
        var img;
        if($(this).data('img-mobile') !== undefined)
          img = $(this).data('img-mobile'); else webp = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    }

    bLazy.revalidate();
  });


  /*popups start*/
  $(document).on('click', 'a[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
    $('body').addClass('hidden');
    setTimeout(function () {
      bLazy.revalidate();
    },500)
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
    $('body').removeClass('hidden');
  });

  $(document).on('click', '.popup', function (e) {

    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
      $('body').removeClass('hidden');
    }
  });
  /*popups end*/

  $('.timepicker').timepicker();
  $('.datepicker').datepicker();

  $(document).on('change' , '.form-group input' , function(e){
    if($(this).val().length !== 0){
      $(this).siblings('label').addClass('show');
    } else {
      $(this).siblings('label').removeClass('show');
    }
  });
  $(document).on('focus' , '.form-group input' , function(e) {
      $(this).siblings('label').addClass('show');
  });
  $(document).on('mouseleave' , '.form-group input' , function(e) {
    if($(this).val().length === 0){
      $(this).siblings('label').removeClass('show');
    }
  });

  $(document).on('click', '.calendar', function(e){
    e.preventDefault();
    $('.calendar-input').click();
  });


  $(document).on('click', '.sched-public-js .btn-ok', function(e){
    e.preventDefault();
    var inputs = $(this).closest('form').find('.sched-public__input > input');
    inputs.each(function(){
      if($(this).val().length === 0){
        $(this).parent().removeClass('correct-field');
        $(this).parent().addClass('error-field');
      } else {
        $(this).parent().removeClass('error-field');
        $(this).parent().addClass('correct-field');
      }
    });
    if($(this).closest('form').find('.correct-field').length > 0 && $(this).closest('form').find('.error-field').length == 0){
      $(this).closest('form').addClass('correct-fields');
      $(this).siblings('[data-dismiss]').click();
    } else {
      $(this).closest('form').removeClass('correct-fields');
    }
  });

});

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();

