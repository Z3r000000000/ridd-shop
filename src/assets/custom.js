$(function() {

	// console.log(); addClass(); removeClass(); hasClass(); toggleClass(); slideUp(); slideDown(); slideToggle(); fadeIn(); fadeOut(); fadeToggle(); siblings();

	/* Маска для телефона */

	$('input[type="tel"]').mask('+7 (999) 999-99-99');

	$('.accountForm__birthDate input').mask('99.99.9999');




	/* Установка минимальной высоты страницы */

	function pageMinHeight() {
		var windowHeight = $(window).innerHeight();
		var headerFooterHeight = 0;

		if ($(window).width() > 750) {
			headerFooterHeight = $('.footer').innerHeight() + $('.headerHead').innerHeight() + $('.headerCenter').innerHeight() + $('.headerBottom').innerHeight();
		} else {
			headerFooterHeight = $('.footer').innerHeight() + $('.mobileHeader').innerHeight();
		}

		$('.pageContent').css('min-height', windowHeight - headerFooterHeight);
	}

	pageMinHeight();

	$(window).on('resize', function() {
		pageMinHeight();
	});




	/* Раскрытие контента в футере (на мобилке) */

	$('.footerBlockTitle').on('click', function(e) {
		e.preventDefault();

		if ($(window).width() < 750) {
			$(this).toggleClass('active').next().slideToggle();
		}
	});

	/* Раскрытие контента в мобильном меню */

	$('.mobMenuBlockTitle').on('click', function(e) {
		e.preventDefault();

		if ($(window).width() < 750) {
			$(this).toggleClass('active').next().slideToggle();
		}
	});




	/* Поиск в мобильной версии */

	$('.mobileHeaderSearchIcon').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobileSearch').toggleClass('active');

		if ($(this).hasClass('active')) {
			$('.mobileSearch__input').focus();
		}		
	});

	$(document).mouseup(function(e) {
		var div1 = $('.mobileSearch');
		var div2 = $('.mobileHeaderSearchIcon');

		if (!div1.is(e.target) && div1.has(e.target).length === 0 && !div2.is(e.target) && div2.has(e.target).length === 0) {
			$('.mobileSearch').removeClass('active');
			$('.mobileHeaderSearchIcon').removeClass('active');
		}
	});




	/* Мобильное меню */

	$('.burger').on('click', function(e) {
		e.preventDefault();

		$('.mobMenuOverlay').fadeIn(250);
		$('.mobMenu').addClass('active');
		$('body').addClass('hidden');
	});

	$('.mobMenuOverlay').on('click', function(e) {
		e.preventDefault();

		$(this).fadeOut(750);
		$('.mobMenu').removeClass('active');
		$('body').removeClass('hidden');
	});

	$('.mobMenuOverlay, .mobMenu').swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') {
				$('.mobMenuOverlay').fadeOut(750);
				$('.mobMenu').removeClass('active');
				$('body').removeClass('hidden');
			}
		}
	});




	/* Всплывающий календарь */

	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '',
		nextText: '',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$('.datepicker-input').datepicker();




	/* Показать/скрыть пароль в формах */

	$('.input_pass .input__icon').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('visiblePassword');

		if ($(this).hasClass('visiblePassword')) {
			$(this).parents('.input').find('input').attr('type', 'text');
			
			$(this).find('img.show').hide();
			$(this).find('img.hide').show();
		} else {
			$(this).parents('.input').find('input').attr('type', 'password');

			$(this).find('img.show').show();
			$(this).find('img.hide').hide();
		}
	});




	/* Список заказов (личный кабинет) */

	$('.lkOrder__head').on('click', function(e) {
		e.preventDefault();

		$(this).find('.lkOrder__arrow').toggleClass('active');
		$(this).parents('.lkOrder').find('.lkOrder__content').slideToggle();
	});




	/* Фильтры на странице каталога */

	for (var i = 0; i < 4; i++) {
		$('.filterBlock').eq(i).addClass('visible');
	}

	$('.filterBlock__title').not('.noArrow').on('click', function(e) {
		e.preventDefault();

		$(this).parents('.filterBlock').toggleClass('visible').find('.filterBlock__content').slideToggle();
	});

	if ($(window).width() < 960) {
		$('.catalogHeadFilter').on('click', function(e) {
			e.preventDefault();

			$('.catalog__filters').addClass('active');
			$('body').addClass('hidden');
		});
	}

	$('.catalogFiltersMob__close').on('click', function(e) {
		e.preventDefault();

		$('.catalog__filters').removeClass('active');
		$('body').removeClass('hidden');
	});




	/* Фильтр по цене */

	if ($('.priceInputs').length > 0) {
		var priceMinInputVal = parseInt($('.priceInputs .min').val());
		var priceMaxInputVal = parseInt($('.priceInputs .max').val());

		var priceInputMin = parseInt($('.priceInputs .min').attr('min'));
		var priceInputMax = parseInt($('.priceInputs .max').attr('max'));
		var priceInputStep = parseInt($('.priceInputs .min').attr('step'));

		$('.priceRange').slider({
		    animate: 'slow',
		    range: true,
		    min: priceInputMin,
		    max: priceMaxInputVal,
		    values: [priceMinInputVal, priceInputMax],
		    step: priceInputStep
		});
	}

	$('.priceRange').on('slide', function(event, ui) {
		var priceRange = $(this).slider('option', 'values');
		priceRange1 = priceRange[0];
		priceRange2 = priceRange[1];

		$('.priceInputs .min').val(priceRange1);
		$('.priceInputs .max').val(priceRange2);
	});

	$('.priceInputs .min').on('input change', function(e) {
		var minVal = parseInt($(this).val());
		var maxVal = parseInt($('.priceInputs .max').val());

		$('.priceRange').slider({
			values: [minVal, maxVal]
		});
	});

	$('.priceInputs .max').on('input change', function(e) {
		var minVal = parseInt($('.priceInputs .min').val());
		var maxVal = parseInt($(this).val());

		$('.priceRange').slider({
			values: [minVal, maxVal]
		});
	});




	/* Коллекции */

	if ($(window).width() > 960) {
		$('.collectionHorizontal').mousewheel(function(event, delta) {
			this.scrollLeft -= (delta * 50);
			event.preventDefault();
		});
	}




	/* Слайдер продукта */
	
	$('.productSlider').slick({
		arrows: false,
		speed: 750,
		swipe: false,
		infinite: false,
		responsive: [{
			breakpoint: 960,
			settings: {
				swipe: true,
				infinite: true,
				dots: true
			}
		}]
	});

	if ($('.productThumbsItem').length > 4) {
		$('.productThumbs__wrap').slick({
			slidesToShow: 4,
			arrows: false,
			speed: 750,
			vertical: true,
			verticalSwiping: true,
			asNavFor: '.productSlider',
			infinite: false
		});
	} else {
		$('.productThumbs__arrow').hide();

		$('.productThumbsItem').first().addClass('active');
	}

	$('.productThumbs__arrow.prev').on('click', function(e) {
		e.preventDefault();

		$('.productThumbs__wrap').slick('slickPrev');
	});

	$('.productThumbs__arrow.next').on('click', function(e) {
		e.preventDefault();

		$('.productThumbs__wrap').slick('slickNext');
	});

	$('.productThumbsItem').on('click', function(e) {
		e.preventDefault();

		if ($('.productThumbsItem').length > 4) {
			$('.productThumbs__wrap').slick('slickGoTo', $(this).index());
		} else {
			$(this).addClass('active').siblings().removeClass('active');
			$('.productSlider').slick('slickGoTo', $(this).index());
		}
	});




	/* Табы в продукте */

	$('.productTabs__item').first().addClass('active');
	$('.productContent__item').first().addClass('active');

	$('.productTabs__item').on('click', function(e) {
		e.preventDefault();

		$(this).addClass('active').siblings().removeClass('active');
		$('.productContent__item').removeClass('active').eq($(this).index()).addClass('active');
	});




	/* Оставить отзыв */

	$('.productReviews__btn').on('click', function(e) {
		e.preventDefault();

		$('.overlay, #reviewModal').fadeIn();
	});

	$('.reviewModalRating__item input').on('change', function() {
		$('.reviewModalRating__item').addClass('opacity');

		var ind = $(this).parents('.reviewModalRating__item').index();

		for (var i = 0; i <= ind; i++) {
			$('.reviewModalRating__item').eq(i).removeClass('opacity');
		}
	});




	/* Скролл из меню */

	// $('.headerMenu__link').on('click', function(e) {
	// 	e.preventDefault();

	// 	$('html, body').animate({
	// 		scrollTop: $($(this).attr('href')).offset().top
	// 	}, 1000);
	// });

	// $('.mobileMenu__link').on('click', function(e) {
	// 	e.preventDefault();

	// 	$('html, body').animate({
	// 		scrollTop: $($(this).attr('href')).offset().top
	// 	}, 1000);

	// 	$('.mobMenu').slideUp();
	//  	$('body').removeClass('hidden');
	// });	




	/* Модальные окна */

	$('.overlay, .modal__close').on('click', function(e) {
		e.preventDefault();

		$('.overlay, .modal').fadeOut();
	});
	




	/* Отправка форм */

	// $('form').on('submit', function(e) {
	// 	e.preventDefault();

	// 	var $this = $(this);
		
 //        $.ajax({
 //            url: 'mail.php',
 //            type: 'POST',
 //            data: $(this).serialize()
 //        }).done(function() {
 //        	$this.find('input').not('[type="hidden"]').val('');
 //        	$this.find('textarea').val('');

 //            $('.modal').fadeOut();
 //            $('#thanksModal').fadeIn();
 //        });
 //    });




 	/* Галерея */

 //    $('[data-fancybox="something"]').fancybox({
	// 	buttons : [
	// 	    'slideShow',
	// 	    'close'
	// 	],
	// 	infobar: true,
	// });





});