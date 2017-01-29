/*! jRespond.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */
!function(a,b,c){"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=c:(a[b]=c,"function"==typeof define&&define.amd&&define(b,[],function(){return c}))}(this,"jRespond",function(a,b,c){"use strict";return function(a){var b=[],d=[],e=a,f="",g="",i=0,j=100,k=500,l=k,m=function(){var a=0;return a="number"!=typeof window.innerWidth?0!==document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth:window.innerWidth},n=function(a){if(a.length===c)o(a);else for(var b=0;b<a.length;b++)o(a[b])},o=function(a){var e=a.breakpoint,h=a.enter||c;b.push(a),d.push(!1),r(e)&&(h!==c&&h.call(null,{entering:f,exiting:g}),d[b.length-1]=!0)},p=function(){for(var a=[],e=[],h=0;h<b.length;h++){var i=b[h].breakpoint,j=b[h].enter||c,k=b[h].exit||c;"*"===i?(j!==c&&a.push(j),k!==c&&e.push(k)):r(i)?(j===c||d[h]||a.push(j),d[h]=!0):(k!==c&&d[h]&&e.push(k),d[h]=!1)}for(var l={entering:f,exiting:g},m=0;m<e.length;m++)e[m].call(null,l);for(var n=0;n<a.length;n++)a[n].call(null,l)},q=function(a){for(var b=!1,c=0;c<e.length;c++)if(a>=e[c].enter&&a<=e[c].exit){b=!0;break}b&&f!==e[c].label?(g=f,f=e[c].label,p()):b||""===f||(f="",p())},r=function(a){if("object"==typeof a){if(a.join().indexOf(f)>=0)return!0}else{if("*"===a)return!0;if("string"==typeof a&&f===a)return!0}},s=function(){var a=m();a!==i?(l=j,q(a)):l=k,i=a,setTimeout(s,l)};return s(),{addFunc:function(a){n(a)},getBreakpoint:function(){return f}}}}(this,this.document));
/*
 * jQuery Superfish Menu Plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// iOS clicks only bubble as far as body children
					$(window).load(function () {
						$('body').children().on('click', $.noop);
					});
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);
					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				o.onBeforeShow.call($ul);
				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);

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
