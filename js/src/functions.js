(function($) {
	"use strict";
	// Overide
	$('nav>ul.menu').attr({id:"menu-main-menu", class:"nav"});
	$('nav>ul.nav ul.menu').attr('class','sub-menu');
	$('nav>ul.nav> li.leaf').attr('class','menu-item');


	// Main Menu
	$('nav.main ul.nav').superfish({
		delay:       1,
		animation:   {opacity:'show',height:'show'},
		speed:       'fast',
		dropShadows: false
	});

    //Header
    function topPadding() {
        var menu = $('header').outerHeight(),
            wp = $('#wpadminbar').outerHeight(),
            set_header_height = menu + wp ;

        $('body').css('padding-top', menu);
    }

    $(window).bind('load', topPadding);
    $(window).bind('resize', topPadding);

   // Mobilemenu
    var jRes = jRespond([
      {
          label: 'small',
          enter: 0,
          exit: 1024
      },

			{
          label: 'large',
          enter: 1024,
          exit: 10000
      }
    ]);

    jRes.addFunc({
        breakpoint: 'small',
        enter: function() {
            $('body').append('<div id="mobile-menu" class="site-navigation"></div>');
						$("#menu-main-menu").clone().appendTo("#mobile-menu");

            $("header nav.main").append('<div id="menu-trigger"><i class="fa fa-bars"></i></div>');
            $("header nav.main").append('<div id="close-menu"><i class="fa fa-close"></i></div>');
            $("#mobile-menu #menu-main-menu li.expanded").prepend('<div class="dropdown-trigger"><i class="fa fa-angle-down"></i></div>');

            $('.dropdown-trigger').click(function() {
                $(this).siblings(".sub-menu").slideToggle();
                $(this).parent().siblings("li.expanded").find(".sub-menu").slideUp();
            });

            $("#menu-trigger").click(function(j) {
                $('body').toggleClass("menu-opened");
                j.stopPropagation();
            })
            $("#close-menu").click(function(e) {
                $('body').removeClass("menu-opened");
                e.stopPropagation();
            })

						$('li.expanded').attr('class','');

        },
        exit: function() {
            $("#mobile-menu, #menu-trigger, #close-menu").remove();
            $("body").removeClass("menu-opened");
        }
    });

    // Floating navigation
    var menu = jQuery('header'),
        pos = menu.offset();

    $(menu).addClass('default');

    $(window).scroll( function(){
        // Floating menu bar
        if ($(this).scrollTop() > 100) {
	        $(menu).addClass('fixed').fadeIn('medium');
	    } else {
	        $(menu).removeClass('fixed').fadeIn('fast');
	    }
     });

    // Animate
    if( _warrior.animation == '1' ) {
		$('section.about_couple .couples, ul.posts-grid li, section.rsvp-cf7 form').addClass('wow fadeIn');
		$('section.countdown').addClass('wow pulse');

		var wow = new WOW({
	        boxClass: 'wow',
	        animateClass: 'animated',
	        offset: 100,
	        delay: 2000,
	        mobile: false
		});
		wow.init();
	}

    $('#reg-bttn, #select-bttn').click(function(e){
        e.preventDefault();
        $('.choose-region').show('fast');
        if($.browser.msie){
        	$('.choose-region').css("visibility","visible");
		}
	});

    $('#close-region').click(function(e){
        e.preventDefault();
        $('.choose-region').hide();
    });


    // Gallery Mixitup
    if( $('#grid, ul.grids').length > 0 ) {
    	$('#grid, ul.grids').mixitup();
    }

	// Resize main background
	resizeWindow();

	$('.widget_categories a').prepend('<i class="fa fa-th-list"></i>');

	function resizeWindow(e) {
		// Vertical center read more button
	    $('.overlay .read-more, .wedding-date').flexVerticalCenter('top');
	};
	$(window).bind('resize', resizeWindow);

	// START: LOAD FUNCTION
	$(window).load(function() {
        // Music button
        $('.bg-soundcloud-embed').hide();

		// Vertical center read more button
	    $('.overlay .read-more, .wedding-date').flexVerticalCenter('top');

	    // If Google Map widget is loaded
	    if( $('#map-wrapper').length > 0 ) {
	    	initializeMap();
	    }

	    // Main background image
		if( $('body.page-template-page-home').length > 0 ) {
			var $slideshow = $('#slideshow'),
				slideshowDuration = $slideshow.data('duration'),
				slideshowImages = [];

			$slideshow.find('.slideshow-images > li').each(function(){
				if ( $('img', this).attr('src') )
					slideshowImages.push([ $('img', this).attr('src') ]);
			});
		}


		var dateObj = new Date(_warrior.countdown_time);
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var hours = dateObj.getUTCHours();
		var minutes = dateObj.getUTCMinutes();
		var seconds = dateObj.getUTCSeconds();

		var finalDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

        // Date - Time
		$('.countdown-timer').countdown(finalDate, {elapse: true}).on('update.countdown', function(event) {
			if (event.elapsed) { // Either true or false
			  	// Date - Time
			  	$('.year .number').html(event.strftime('%-Y'));
			  	$('.month .number').html(event.strftime('%-m'));
			  	$('.day .number').html(event.strftime('%-d'));
			  	$('.hour .number').html(event.strftime('%-H'));
			  	$('.minute .number').html(event.strftime('%-M'));
			  	$('.second .number').html(event.strftime('%-S'));

			  	// Text
			  	$('.year .text').html(event.strftime('Years'));
			  	$('.month .text').html(event.strftime('Months'));
			  	$('.day .text').html(event.strftime('Days'));
			  	$('.hour .text').html(event.strftime('Hours'));
			  	$('.minute .text').html(event.strftime('Minutes'));
			  	$('.second .text').html(event.strftime('Seconds'));
			} else {
			  	// Date - Time
			  	$('.year .number').html(event.strftime('%-Y'));
			  	$('.month .number').html(event.strftime('%-m'));
			  	$('.day .number').html(event.strftime('%-d'));
			  	$('.hour .number').html(event.strftime('%-H'));
			  	$('.minute .number').html(event.strftime('%-M'));
			  	$('.second .number').html(event.strftime('%-S'));

			  	// Text
			  	$('.year .text').html(event.strftime('Years'));
			  	$('.month .text').html(event.strftime('Months'));
			  	$('.day .text').html(event.strftime('Days'));
			  	$('.hour .text').html(event.strftime('Hours'));
			  	$('.minute .text').html(event.strftime('Minutes'));
			  	$('.second .text').html(event.strftime('Seconds'));
			}
		});

		// Guestbook slider
		if( $('.main #guestbook').length > 0 ) {
		  	$('.main #guestbook').owlCarousel({
		      	items: 3,
		      	navigation: false,
		      	navigationText: false,
		      	pagination: true,
		      	itemsDesktop: [1000,3],
		      	itemsDesktopSmall: [900,2],
		      	itemsTablet: [600,1],
		      	itemsMobile: [480,1]
		  	});
		}
	});
	// END: LOAD FUNCTION

	//Parallax
	jQuery(window).trigger('resize').trigger('scroll');

	function bindInfoWindow(marker, map, infoWindow, html) {
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(html);
			infoWindow.open(map, marker);
		});

		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	}

    // Music button
	$("#bg-btn").click(function(){
        $(".bg-soundcloud-embed").toggle();
	});

    $(".gallery a").attr("data-size","2048x1365");
    // $('dt.gallery-icon').contents().unwrap();
    $(".gallery br").remove();

    // Light Gallery
    $('ul.galleries').lightGallery({
        selector: '.gallery-item',
        animateThumb: false,
        showThumbByDefault: false
    });

    // PhotoSwupe
    // var $pswp = $('.pswp')[0];
    // var image = [];

    // $('ul.galleries').each( function() {
    //     var $pic     = $(this),
    //         getItems = function() {
    //             var items = [];
    //             $pic.find('a').each(function() {
    //                 var $href   = $(this).attr('href'),
    //                     $size   = $(this).data('size').split('x'),
    //                     $width  = $size[0],
    //                     $height = $size[1];

    //                 var item = {
    //                     src : $href,
    //                     w   : $width,
    //                     h   : $height
    //                 }

    //                 items.push(item);
    //             });
    //             return items;
    //         }

    //     var items = getItems();

    //     $.each(items, function(index, value) {
    //         image[index]     = new Image();
    //         image[index].src = value['src'];
    //     });

    //     $pic.on('click', '.gallery-item', function(event) {
    //         event.preventDefault();

    //         var $index = $(this).index();
    //         var options = {
    //             index: $index,
    //             bgOpacity: 0.7,
    //             showHideOpacity: true
    //         }

    //         var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
    //         lightBox.init();
    //     });
    // });

    // PhotoSwipe
    // $('ul.galleries').each( function() {
    //     var $pic = $(this),
    //     getItems = function() {
    //         var items = [];
    //         $pic.find('a').each(function() {
    //             var $href   = $(this).attr('href'),
    //                 $size   = $(this).data('size').split('x'),
    //                 $width  = $size[0],
    //                 $height = $size[1];

    //             var item = {
    //                 src : $href,
    //                 w   : $width,
    //                 h   : $height
    //             }

    //             items.push(item);
    //         });
    //         return items;
    //     }

    //     var items = getItems();
    //     var $pswp = $('.pswp')[0];
    //     $pic.on('click', '.gallery-item', function(event) {
    //         event.preventDefault();

    //         var $index = $(this).index();
    //         var options = {
    //             index: $index,
    //             bgOpacity: 0.7,
    //             showHideOpacity: true
    //         }

    //         // Initialize PhotoSwipe
    //         var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
    //         lightBox.init();
    //     });
    // });
})(jQuery);










// PhotoSwipe
// var initPhotoSwipeFromDOM = function(gallerySelector) {
//     // parse slide data (url, title, size ...) from DOM elements
//     // (children of gallerySelector)
//     var parseThumbnailElements = function(el) {
//         var thumbElements = el.childNodes,
//             numNodes = thumbElements.length,
//             items = [],
//             ddEl,
//             linkEl,
//             size,
//             item;

//         for(var i = 0; i < numNodes; i++) {
//             ddEl = thumbElements[i]; // <dd> element

//             // include only element nodes
//             if(ddEl.nodeType !== 1) {
//                 continue;
//             }

//             if(el.tagName == "UL"){ //Chcek Tag Name

//             linkEl = ddEl.children[0]; // <a> element
//             size = linkEl.getAttribute('data-size').split('x');

//             // create slide object
//             item = {
//                 src: linkEl.getAttribute('href'),
//                 w: parseInt(size[0], 10),
//                 h: parseInt(size[1], 10)
//             };

//             if(ddEl.children.length > 1) {
//                 // <figcaption> content
//                 item.title = ddEl.children[1].innerHTML;
//             }

//             if(linkEl.children.length > 0) {
//                 // <img> thumbnail element, retrieving thumbnail url
//                 item.msrc = linkEl.children[0].getAttribute('src');
//             }

//             }else{

//             linkEl = ddEl.children[0]; // <a> element
//             size = linkEl.children[0].getAttribute('data-size').split('x');

//             // create slide object
//             item = {
//                 src: linkEl.children[0].getAttribute('href'),
//                 w: parseInt(size[0], 10),
//                 h: parseInt(size[1], 10)
//             };

//             if(el.children[1].length > 1) {
//                 // <figcaption> content
//                 item.title = linkEl.parentNode.children[1].innerHTML;
//             }

//             if(linkEl.children[0].children[0].length > 0) {
//                 // <img> thumbnail element, retrieving thumbnail url
//                 item.msrc = el.children[0].children[0].children[0].getAttribute('src');
//             }

//             } //End Check Tag Name

//             item.el = ddEl; // save link to element for getThumbBoundsFn
//             items.push(item);
//         }

//         return items;
//     };

//     // find nearest parent element
//     var closest = function closest(el, fn) {
//         return el && ( fn(el) ? el : closest(el.parentNode, fn) );
//     };

//     // triggers when user clicks on thumbnail
//     var onThumbnailsClick = function(e) {
//         e = e || window.event;
//         e.preventDefault ? e.preventDefault() : e.returnValue = false;

//         var eTarget = e.target || e.srcElement;

//         // find root element of slide
//         var clickedListItem = closest(eTarget, function(el) {
//             return (el.tagName && el.tagName.toUpperCase() === 'LI' || el.tagName.toUpperCase() === 'DL' );
//         });

//         if(!clickedListItem) {
//             return;
//         }

//         // find index of clicked item by looping through all child nodes
//         // alternatively, you may define index via data- attribute
//         var clickedGallery = clickedListItem.parentNode,
//             childNodes = clickedListItem.parentNode.childNodes,
//             numChildNodes = childNodes.length,
//             nodeIndex = 0,
//             index;

//         for (var i = 0; i < numChildNodes; i++) {
//             if(childNodes[i].nodeType !== 1) {
//                 continue;
//             }

//             if(childNodes[i] === clickedListItem) {
//                 index = nodeIndex;
//                 break;
//             }
//             nodeIndex++;
//         }

//         if(index >= 0) {
//             // open PhotoSwipe if valid index found
//             openPhotoSwipe( index, clickedGallery );
//         }
//         return false;
//     };

//     // parse picture index and gallery index from URL (#&pid=1&gid=2)
//     var photoswipeParseHash = function() {
//         var hash = window.location.hash.substring(1),
//         params = {};

//         if(hash.length < 5) {
//             return params;
//         }

//         var vars = hash.split('&');
//         for (var i = 0; i < vars.length; i++) {
//             if(!vars[i]) {
//                 continue;
//             }
//             var pair = vars[i].split('=');
//             if(pair.length < 2) {
//                 continue;
//             }
//             params[pair[0]] = pair[1];
//         }

//         if(params.gid) {
//             params.gid = parseInt(params.gid, 10);
//         }

//         return params;
//     };

//     var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
//         var pswpElement = document.querySelectorAll('.pswp')[0],
//             gallery,
//             options,
//             items;

//         items = parseThumbnailElements(galleryElement);

//         // define options (if needed)
//         options = {

//             // define gallery index (for URL)
//             galleryUID: galleryElement.getAttribute('data-pswp-uid'),

//             getThumbBoundsFn: function(index) {
//                 // See Options -> getThumbBoundsFn section of documentation for more info
//                 var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
//                     pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
//                     rect = thumbnail.getBoundingClientRect();

//                 return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
//             }

//         };

//         // PhotoSwipe opened from URL
//         if(fromURL) {
//             if(options.galleryPIDs) {
//                 // parse real index when custom PIDs are used
//                 // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
//                 for(var j = 0; j < items.length; j++) {
//                     if(items[j].pid == index) {
//                         options.index = j;
//                         break;
//                     }
//                 }
//             } else {
//                 // in URL indexes start from 1
//                 options.index = parseInt(index, 10) - 1;
//             }
//         } else {
//             options.index = parseInt(index, 10);
//         }

//         // exit if index not found
//         if( isNaN(options.index) ) {
//             return;
//         }

//         if(disableAnimation) {
//             options.showAnimationDuration = 0;
//         }

//         // Pass data to PhotoSwipe and initialize it
//         gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
//         gallery.init();
//     };

//     // loop through all gallery elements and bind events
//     var galleryElements = document.querySelectorAll( gallerySelector );

//     for(var i = 0, l = galleryElements.length; i < l; i++) {
//         galleryElements[i].setAttribute('data-pswp-uid', i+1);
//         galleryElements[i].onclick = onThumbnailsClick;
//     }

//     // Parse URL and open gallery if it contains #&pid=3&gid=1
//     var hashData = photoswipeParseHash();
//     if(hashData.pid && hashData.gid) {
//         openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
//     }
// };

// // execute above function
// initPhotoSwipeFromDOM('.galleries, .gallery');
