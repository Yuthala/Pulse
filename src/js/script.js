$(document).ready(function(){

  //E-mail Ajax Send
	$("consultation-form").submit(function() { //Change - указать правильный селектор формы
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change - изменить путь до mail.php или положить mail.php в ту же папку где лежит script.js
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
   
  //Slider

  let slideIndex = 1,  

	slides = document.querySelectorAll('.slider-item'), 
	prev = document.querySelector('.prev'),
	next = document.querySelector('.next'),
	dotsWrap = document.querySelector('.slider-dots'),
	dots = document.querySelectorAll('.dot'); 

	showSlides(slideIndex); 

	function showSlides() { 

			if (slideIndex > slides.length) { 
				slideIndex = 1; 
			}
			if (slideIndex < 1) { 
				slideIndex = slides.length; 
			}

		slides.forEach((item) => item.style.display = 'none'); 
		dots.forEach((item) => item.classList.remove('dot-active')); 

		slides[slideIndex - 1].style.display = 'block';  
		dots[slideIndex - 1].classList.add('dot-active'); 
	}


	function plusSlides() {
		slideIndex ++; 
		showSlides();
	}


	prev.addEventListener('click', function() {
		slideIndex -= 2; 
		plusSlides(); 
	});


	next.addEventListener('click', function() {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function(event) {
		for (let i = 0; i < dots.length + 1; i++) {

			if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
				slideIndex = i;
				showSlides(); 
			}
		}
	});

  // Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

$('.button_mini').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    });
});

  

  function valideForms(form){
    $('form').validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите  {0} символов")
        },
        email: {
          required: "Пожалуйста, введите ваш e-mail",
          email: "Пожалуйста, укажите верный e-mail"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask("(+7) 999 99 99");

 
  //Smooth scrol and page up
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function() { 
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});

