// ==UserScript==
// @name			4chan-Slideshow
// @namespace		http://dial-a-davidson.net
// @description		Creates a button for showing a slideshow of every image in the thread
// @include			http://boards.4chan.org/*
// @match			http://boards.4chan.org/*
// ==/UserScript==


// the guts of this userscript
function main() {
	/*
	 AnythingSlider v1.7.24 minified using Google Closure Compiler
	 Original by Chris Coyier: http://css-tricks.com
	 Get the latest version: https://github.com/ProLoser/AnythingSlider
	*/

	(function(d){d.anythingSlider=function(h,j){var a=this,b;a.el=h;a.$el=d(h).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');a.$el.data("AnythingSlider",a);a.init=function(){a.options=b=d.extend({},d.anythingSlider.defaults,j);a.initialized=!1;d.isFunction(b.onBeforeInitialize)&&a.$el.bind("before_initialize",b.onBeforeInitialize);a.$el.trigger("before_initialize",a);a.$wrapper=a.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-"+ b.theme);a.$window=a.$el.closest("div.anythingWindow");a.win=window;a.$win=d(a.win);a.$controls=d('<div class="anythingControls"></div>').appendTo(b.appendControlsTo&&d(b.appendControlsTo).length?d(b.appendControlsTo):a.$wrapper);a.$startStop=d('<a href="#" class="start-stop"></a>');b.buildStartStop&&a.$startStop.appendTo(b.appendStartStopTo&&d(b.appendStartStopTo).length?d(b.appendStartStopTo):a.$controls);a.$nav=d('<ul class="thumbNav" />').appendTo(b.appendNavigationTo&&d(b.appendNavigationTo).length? d(b.appendNavigationTo):a.$controls);a.flag=!1;a.playing=b.autoPlay;a.slideshow=!1;a.hovered=!1;a.panelSize=[];a.currentPage=b.startPanel=parseInt(b.startPanel,10)||1;b.changeBy=parseInt(b.changeBy,10)||1;a.adj=b.infiniteSlides?0:1;a.width=a.$el.width();a.height=a.$el.height();a.outerPad=[a.$wrapper.innerWidth()-a.$wrapper.width(),a.$wrapper.innerHeight()-a.$wrapper.height()];b.playRtl&&a.$wrapper.addClass("rtl");if(b.expand)a.$outer=a.$wrapper.parent(),a.$window.css({width:"100%",height:"100%"}), a.checkResize();b.buildStartStop&&a.buildAutoPlay();b.buildArrows&&a.buildNextBackButtons();if(!b.autoPlay)b.autoPlayLocked=!1;a.updateSlider();a.$lastPage=a.$currentPage;a.runTimes=d("div.anythingSlider").index(a.$wrapper)+1;a.regex=RegExp("panel"+a.runTimes+"-(\\d+)","i");1===a.runTimes&&a.makeActive();if(!d.isFunction(d.easing[b.easing]))b.easing="swing";b.pauseOnHover&&a.$wrapper.hover(function(){a.playing&&(a.$el.trigger("slideshow_paused",a),a.clearTimer(!0))},function(){a.playing&&(a.$el.trigger("slideshow_unpaused", a),a.startStop(a.playing,!0))});a.setCurrentPage(a.gotoHash()||b.startPage,!1);a.slideControls(!1);a.$wrapper.bind("mouseenter mouseleave",function(b){a.hovered="mouseenter"===b.type?!0:!1;a.slideControls(a.hovered,!1)});d(document).keyup(function(c){if(b.enableKeyboard&&a.$wrapper.is(".activeSlider")&&!c.target.tagName.match("TEXTAREA|INPUT|SELECT")&&(b.vertical||!(38===c.which||40===c.which)))switch(c.which){case 39:case 40:a.goForward();break;case 37:case 38:a.goBack()}});a.$items.delegate("a", "focus.AnythingSlider",function(c){var e=d(this).closest(".panel"),e=a.$items.index(e)+a.adj;a.$items.find(".focusedLink").removeClass("focusedLink");d(this).addClass("focusedLink");a.$window.scrollLeft(0);if(-1!==e&&(e>=a.currentPage+b.showMultiple||e<a.currentPage))a.gotoPage(e),c.preventDefault()});var c="slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");d.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(f,e){d.isFunction(b[e])&&a.$el.bind(c[f],b[e])});d.isFunction(b.onSlideComplete)&&a.$el.bind("slide_complete",function(){setTimeout(function(){b.onSlideComplete(a)},0)});a.initialized=!0;a.$el.trigger("initialized",a);a.startStop(a.playing)};a.updateSlider=function(){a.$el.children(".cloned").remove();a.$nav.empty();a.currentPage=a.currentPage||1;a.$items=a.$el.children();a.pages=a.$items.length;a.dir=b.vertical?"top":"left";b.showMultiple=b.vertical?1:parseInt(b.showMultiple,10)||1;b.navigationSize= !1===b.navigationSize?0:parseInt(b.navigationSize,10)||0;if(1<b.showMultiple){if(b.showMultiple>a.pages)b.showMultiple=a.pages;a.adjustMultiple=b.infiniteSlides&&1<a.pages?0:b.showMultiple-1;a.pages=a.$items.length-a.adjustMultiple}a.$controls.add(a.$nav).add(a.$startStop).add(a.$forward).add(a.$back)[1>=a.pages?"hide":"show"]();1<a.pages&&a.buildNavigation();b.infiniteSlides&&1<a.pages&&(a.$el.prepend(a.$items.filter(":last").clone().addClass("cloned")),1<b.showMultiple?a.$el.append(a.$items.filter(":lt("+ b.showMultiple+")").clone().addClass("cloned multiple")):a.$el.append(a.$items.filter(":first").clone().addClass("cloned")),a.$el.find(".cloned").each(function(){d(this).find("a,input,textarea,select,button,area").attr("disabled","disabled");d(this).find("[id]").andSelf().removeAttr("id")}));a.$items=a.$el.children().addClass("panel"+(b.vertical?" vertical":""));a.setDimensions();b.resizeContents?(a.$items.css("width",a.width),a.$wrapper.css("width",a.getDim(a.currentPage)[0]).add(a.$items).css("height", a.height)):a.$win.load(function(){a.setDimensions()});if(a.currentPage>a.pages)a.currentPage=a.pages;a.setCurrentPage(a.currentPage,!1);a.$nav.find("a").eq(a.currentPage-1).addClass("cur")};a.buildNavigation=function(){if(b.buildNavigation&&1<a.pages){var c,f;a.$items.filter(":not(.cloned)").each(function(e){var g=e+1;c=(1===g?"first":"")+(g===a.pages?"last":"");f=d('<a class="panel'+g+'" href="#"><span></span></a>').wrap('<li class="'+c+'" />');a.$nav.append(f.parent());d.isFunction(b.navigationFormatter)? (c=b.navigationFormatter(g,d(this)),"hidden"===f.find("span").css("visibility")&&f.addClass(b.tooltipClass).attr("title",c)):c=g;f.bind(b.clickControls,function(c){if(!a.flag&&b.enableNavigation)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.gotoPage(g),b.hashTags&&a.setHash(g);c.preventDefault()}).find("span").html(c)});if(b.navigationSize&&b.navigationSize<a.pages)a.$controls.find(".anythingNavWindow").length||a.$nav.before('<ul><li class="prev"><a href="#"><span>'+b.backText+"</span></a></li></ul>").after('<ul><li class="next"><a href="#"><span>'+ b.forwardText+"</span></a></li></ul>").wrap('<div class="anythingNavWindow"></div>'),a.navWidths=a.$nav.find("li").map(function(){return d(this).innerWidth()+Math.ceil(parseInt(d(this).find("span").css("left"),10)/2||0)}).get(),a.navLeft=1,a.$nav.width(a.navWidth(1,a.pages+1)+5),a.$controls.find(".anythingNavWindow").width(a.navWidth(1,b.navigationSize+1)).end().find(".prev,.next").bind(b.clickControls,function(c){if(!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},200),a.navWindow(a.navLeft+b.navigationSize* (d(this).is(".prev")?-1:1));c.preventDefault()})}};a.navWidth=function(b,f){var e;e=Math.min(b,f);for(var d=Math.max(b,f),i=0;e<d;e++)i+=a.navWidths[e-1]||0;return i};a.navWindow=function(c){if(b.navigationSize&&b.navigationSize<a.pages&&a.navWidths){var f=a.pages-b.navigationSize+1,c=1>=c?1:1<c&&c<f?c:f;if(c!==a.navLeft)a.$controls.find(".anythingNavWindow").animate({scrollLeft:a.navWidth(1,c),width:a.navWidth(c,c+b.navigationSize)},{queue:!1,duration:b.animationTime}),a.navLeft=c}};a.buildNextBackButtons= function(){a.$forward=d('<span class="arrow forward"><a href="#"><span>'+b.forwardText+"</span></a></span>");a.$back=d('<span class="arrow back"><a href="#"><span>'+b.backText+"</span></a></span>");a.$back.bind(b.clickBackArrow,function(c){if(b.enableArrows&&!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.goBack();c.preventDefault()});a.$forward.bind(b.clickForwardArrow,function(c){if(b.enableArrows&&!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.goForward();c.preventDefault()}); a.$back.add(a.$forward).find("a").bind("focusin focusout",function(){d(this).toggleClass("hover")});a.$back.appendTo(b.appendBackTo&&d(b.appendBackTo).length?d(b.appendBackTo):a.$wrapper);a.$forward.appendTo(b.appendForwardTo&&d(b.appendForwardTo).length?d(b.appendForwardTo):a.$wrapper);a.arrowWidth=a.$forward.width();a.arrowRight=parseInt(a.$forward.css("right"),10);a.arrowLeft=parseInt(a.$back.css("left"),10)};a.buildAutoPlay=function(){a.$startStop.html("<span>"+(a.playing?b.stopText:b.startText)+ "</span>").bind(b.clickSlideshow,function(c){b.enableStartStop&&(a.startStop(!a.playing),a.makeActive(),a.playing&&!b.autoPlayDelayed&&a.goForward(!0));c.preventDefault()}).bind("focusin focusout",function(){d(this).toggleClass("hover")})};a.checkResize=function(c){clearTimeout(a.resizeTimer);a.resizeTimer=setTimeout(function(){var f=a.$outer.width()-a.outerPad[0],e=("BODY"===a.$outer[0].tagName?a.$win.height():a.$outer.height())-a.outerPad[1];if(a.width*b.showMultiple!==f||a.height!==e)a.setDimensions(), a.gotoPage(a.currentPage,a.playing,null,-1);"undefined"===typeof c&&a.checkResize()},500)};a.setDimensions=function(){var c,f,e,g,i=0,h={width:"100%",height:"100%"},j=1<b.showMultiple?a.width||a.$window.width()/b.showMultiple:a.$window.width(),k=a.$win.width();if(b.expand)c=a.$outer.width()-a.outerPad[0],a.height=f=a.$outer.height()-a.outerPad[1],a.$wrapper.add(a.$window).add(a.$items).css({width:c,height:f}),a.width=j=1<b.showMultiple?c/b.showMultiple:c;a.$items.each(function(l){g=d(this);e=g.children(); if(b.resizeContents)c=a.width,f=a.height,g.css({width:c,height:f}),e.length&&("EMBED"===e[0].tagName&&e.attr(h),"OBJECT"===e[0].tagName&&e.find("embed").attr(h),1===e.length&&e.css(h));else{c=g.width()||a.width;1===e.length&&c>=k&&(c=e.width()>=k?j:e.width(),e.css("max-width",c));g.css("width",c);f=1===e.length?e.outerHeight(!0):g.height();if(f<=a.outerPad[1])f=a.height;g.css("height",f)}a.panelSize[l]=[c,f,i];i+=b.vertical?f:c});a.$el.css(b.vertical?"height":"width",i)};a.getDim=function(c){if(1> a.pages||isNaN(c))return[a.width,a.height];var c=b.infiniteSlides&&1<a.pages?c:c-1,f,e=a.panelSize[c][0],d=a.panelSize[c][1];if(1<b.showMultiple)for(f=1;f<b.showMultiple;f++)e+=a.panelSize[(c+f)%b.showMultiple][0],d=Math.max(d,a.panelSize[c+f][1]);return[e,d]};a.goForward=function(c){a.gotoPage(a.currentPage+b.changeBy*(b.playRtl?-1:1),c)};a.goBack=function(c){a.gotoPage(a.currentPage+b.changeBy*(b.playRtl?1:-1),c)};a.gotoPage=function(c,f,e,g){!0!==f&&(f=!1,a.startStop(!1),a.makeActive());/^[#|.]/.test(c)&& d(c).length&&(c=d(c).closest(".panel").index()+a.adj);1!==b.changeBy&&(0>c&&(c+=a.pages),c>a.pages&&(c-=a.pages));if(!(1>=a.pages)){a.$lastPage=a.$currentPage;if("number"!==typeof c)c=b.startPanel,a.setCurrentPage(c);if(!f||!b.isVideoPlaying(a)){a.exactPage=c;c>a.pages+1-a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?1:a.pages);c<a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?a.pages:1);if(!b.infiniteSlides)a.exactPage=c;a.currentPage=c>a.pages?a.pages:1>c?1:a.currentPage;a.$currentPage=a.$items.eq(a.currentPage- a.adj);a.targetPage=0===c?a.pages:c>a.pages?1:c;a.$targetPage=a.$items.eq(a.targetPage-1);g=g||b.animationTime;0<=g&&a.$el.trigger("slide_init",a);a.slideControls(!0,!1);!0!==f&&(f=!1);(!f||b.stopAtEnd&&c===a.pages)&&a.startStop(!1);0<=g&&a.$el.trigger("slide_begin",a);setTimeout(function(d){b.resizeContents||(d=a.getDim(c),a.$wrapper.filter(":not(:animated)").animate({width:d[0]||a.width,height:d[1]||a.height},{queue:!1,duration:0>g?0:g,easing:b.easing}));d={};d[a.dir]=-a.panelSize[b.infiniteSlides&& 1<a.pages?c:c-1][2];a.$el.filter(":not(:animated)").animate(d,{queue:!1,duration:g,easing:b.easing,complete:function(){a.endAnimation(c,e,g)}})},parseInt(b.delayBeforeAnimate,10)||0)}}};a.endAnimation=function(c,d,e){0===c?(a.$el.css(a.dir,-a.panelSize[a.pages][2]),c=a.pages):c>a.pages&&(a.$el.css(a.dir,-a.panelSize[1][2]),c=1);a.exactPage=c;a.setCurrentPage(c,!1);a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage");a.hovered||a.slideControls(!1);0<=e&&a.$el.trigger("slide_complete", a);"function"===typeof d&&d(a);b.autoPlayLocked&&!a.playing&&setTimeout(function(){a.startStop(!0)},b.resumeDelay-(b.autoPlayDelayed?b.delay:0))};a.setCurrentPage=function(c,d){c=parseInt(c,10);if(!(1>a.pages||0===c||isNaN(c))){c>a.pages+1-a.adj&&(c=a.pages-a.adj);c<a.adj&&(c=1);b.buildNavigation&&a.$nav.find(".cur").removeClass("cur").end().find("a").eq(c-1).addClass("cur");!b.infiniteSlides&&b.stopAtEnd&&(a.$wrapper.find("span.forward")[c===a.pages?"addClass":"removeClass"]("disabled").end().find("span.back")[1=== c?"addClass":"removeClass"]("disabled"),c===a.pages&&a.playing&&a.startStop());if(!d){var e=a.getDim(c);a.$wrapper.css({width:e[0],height:e[1]}).add(a.$window).scrollLeft(0);a.$el.css(a.dir,-a.panelSize[b.infiniteSlides&&1<a.pages?c:c-1][2])}a.currentPage=c;a.$currentPage=a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage")}};a.makeActive=function(){a.$wrapper.is(".activeSlider")||(d(".activeSlider").removeClass("activeSlider"),a.$wrapper.addClass("activeSlider"))};a.gotoHash=function(){var c= a.win.location.hash,f=c.indexOf("&"),e=c.match(a.regex);null===e&&!/^#&/.test(c)&&!/#!?\//.test(c)?(c=c.substring(0,0<=f?f:c.length),e=d(c).length&&d(c).closest(".anythingBase")[0]===a.el?d(c).closest(".panel").index():null):null!==e&&(e=b.hashTags?parseInt(e[1],10):null);return e};a.setHash=function(b){var d="panel"+a.runTimes+"-",e=a.win.location.hash;if("undefined"!==typeof e)a.win.location.hash=0<e.indexOf(d)?e.replace(a.regex,d+b):e+"&"+d+b};a.slideControls=function(c){var d=c?0:b.animationTime, e=c?b.animationTime:0,g=c?1:0,h=c?0:1;b.toggleControls&&a.$controls.stop(!0,!0).delay(d)[c?"slideDown":"slideUp"](b.animationTime/2).delay(e);b.buildArrows&&b.toggleArrows&&(!a.hovered&&a.playing&&(h=1,g=0),a.$forward.stop(!0,!0).delay(d).animate({right:a.arrowRight+h*a.arrowWidth,opacity:g},b.animationTime/2),a.$back.stop(!0,!0).delay(d).animate({left:a.arrowLeft+h*a.arrowWidth,opacity:g},b.animationTime/2))};a.clearTimer=function(b){if(a.timer&&(a.win.clearInterval(a.timer),!b&&a.slideshow))a.$el.trigger("slideshow_stop", a),a.slideshow=!1};a.startStop=function(c,d){!0!==c&&(c=!1);if((a.playing=c)&&!d)a.$el.trigger("slideshow_start",a),a.slideshow=!0;b.buildStartStop&&(a.$startStop.toggleClass("playing",c).find("span").html(c?b.stopText:b.startText),0>parseInt(a.$startStop.find("span").css("text-indent"),10)&&a.$startStop.addClass(b.tooltipClass).attr("title",c?b.stopText:b.startText));c?(a.clearTimer(!0),a.timer=a.win.setInterval(function(){b.isVideoPlaying(a)?b.resumeOnVideoEnd||a.startStop():a.goForward(!0)},b.delay)): a.clearTimer()};a.init()};d.anythingSlider.defaults={theme:"default",expand:!1,resizeContents:!0,vertical:!1,showMultiple:!1,easing:"swing",buildArrows:!0,buildNavigation:!0,buildStartStop:!0,toggleArrows:!1,toggleControls:!1,startText:"Start",stopText:"Stop",forwardText:"&raquo;",backText:"&laquo;",tooltipClass:"tooltip",enableArrows:!0,enableNavigation:!0,enableStartStop:!0,enableKeyboard:!0,startPanel:1,changeBy:1,hashTags:!0,infiniteSlides:!0,navigationFormatter:null,navigationSize:!1,autoPlay:!1, autoPlayLocked:!1,autoPlayDelayed:!1,pauseOnHover:!0,stopAtEnd:!1,playRtl:!1,delay:3E3,resumeDelay:15E3,animationTime:600,delayBeforeAnimate:0,clickForwardArrow:"click",clickBackArrow:"click",clickControls:"click focusin",clickSlideshow:"click",resumeOnVideoEnd:!0,resumeOnVisible:!0,addWmodeToObject:"opaque",isVideoPlaying:function(){return!1}};d.fn.anythingSlider=function(h,j){return this.each(function(){var a,b=d(this).data("AnythingSlider");(typeof h).match("object|undefined")?b?b.updateSlider(): new d.anythingSlider(this,h):/\d/.test(h)&&!isNaN(h)&&b?(a="number"===typeof h?h:parseInt(d.trim(h),10),1<=a&&a<=b.pages&&b.gotoPage(a,!1,j)):/^[#|.]/.test(h)&&d(h).length&&b.gotoPage(h,!1,j)})}})(jQuery);
		
	
	// My actual code - Matthew Davidson
	var imgAnchors = $("form[name=delform] a:parent[href$=jpeg], form[name=delform] a[href$=jpg], form[name=delform] a[href$=png], form[name=delform] a[href$=gif]").has("img");
	var imgUrls = $.makeArray(imgAnchors.map(function(){return this.href;}));
	//var slider = $("<div id='sliderDiv'><ul id='slider'><li><img src='" + imgUrls.join("'></li><li><img src='") + "'></li></ul></div>");
	var slider = $("<div id='sliderDiv'><ul id='slider'><li><img src='" + imgUrls.slice(0, 3).join("'></li><li><img src='") + "'></li></ul></div>");
	$("body").append(slider);
	
	$('#sliderDiv').css("width", $(window).width());
	$('#sliderDiv').css("height", $(window).height());
	//$('#sliderDiv').css("width", $(window).width() - 200);
	//$('#sliderDiv').css("height", 400);
	//$('#sliderDiv').css("position", "fixed");
	
	$('#slider').anythingSlider({
	  // Appearance
	  theme               : "minimalist-round", // Theme name
	  expand              : true,     // If true, the entire slider will expand to fit the parent element
	  resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
	  vertical            : false,     // If true, all panels will slide vertically; they slide horizontally otherwise
	  showMultiple        : false,     // Set this value to a number and it will show that many slides at once
	  easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI

	  buildArrows         : true,      // If true, builds the forwards and backwards buttons
	  buildNavigation     : false,      // If true, builds a list of anchor links to link to each panel
	  buildStartStop      : true,      // If true, builds the start/stop button and adds slideshow functionality

	  appendForwardTo     : null,      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendBackTo        : null,      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null

	  toggleArrows        : true,     // If true, side navigation arrows will slide out on hovering & hide @ other times
	  toggleControls      : true,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times

	  startText           : "Start",   // Start button text
	  stopText            : "Stop",    // Stop button text
	  forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
	  backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
	  tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)

	  // Function
	  enableArrows        : true,      // if false, arrows will be visible, but not clickable.
	  enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
	  enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
	  enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.

	  // Navigation
	  startPanel          : 1,         // This sets the initial panel
	  changeBy            : 1,         // Amount to go forward or back when changing panels.
	  hashTags            : false,      // Should links change the hashtag in the URL?
	  infiniteSlides      : true,      // if false, the slider will not wrap & not clone any panels
	  navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
	  navigationSize      : 10,     // Set this to the maximum number of visible navigation tabs; false to disable

	  // Slideshow options
	  autoPlay            : true,     // If true, the slideshow will start running; replaces "startStopped" option
	  autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
	  autoPlayDelayed     : false,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
	  pauseOnHover        : false,      // If true & the slideshow is active, the slideshow will pause on hover
	  stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
	  playRtl             : false,     // If true, the slideshow will move right-to-left

	  // Times
	  delay               : 7000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
	  resumeDelay         : 7000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
	  animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
	  delayBeforeAnimate  : 0,         // How long to pause slide animation before going to the desired slide (used if you want your "out" FX to show).

	  // Callbacks
	  onBeforeInitialize  : function(e, slider) {}, // Callback before the plugin initializes
	  onInitialized       : function(e, slider) {}, // Callback when the plugin finished initializing
	  onShowStart         : function(e, slider) {}, // Callback on slideshow start
	  onShowStop          : function(e, slider) {}, // Callback after slideshow stops
	  onShowPause         : function(e, slider) {}, // Callback when slideshow pauses
	  onShowUnpause       : function(e, slider) {}, // Callback when slideshow unpauses - may not trigger properly if user clicks on any controls
	  onSlideInit         : function(e, slider) {}, // Callback when slide initiates, before control animation
	  onSlideBegin        : function(e, slider) {}, // Callback before slide animates
	  onSlideComplete     : function(slider) {},    // Callback when slide completes; this is the only callback without an event "e" variable

	  // Interactivity
	  clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
	  clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
	  clickControls       : "click focusin", // Events used to activate navigation control functionality
	  clickSlideshow      : "click",         // Event used to activate slideshow play/stop button

	  // Video
	  resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
	  resumeOnVisible     : true,      // If true the video will resume playing (if previously paused, except for YouTube iframe - known issue); if false, the video remains paused.
	  addWmodeToObject    : "opaque",  // If your slider has an embedded object, the script will automatically add a wmode parameter with this setting
	  isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension
	});
}


GM_addStyle("/*\
	AnythingSlider v1.7+ themes\
	Default 1 theme - no images/css3\
*/\
\
/****************************\
 SET DEFAULT DIMENSIONS HERE\
 ****************************/\
/* Change the ID to match your slider */\
#slider {\
	width: 1000px;\
	height: 390px;\
	list-style: none;\
	/* Prevent FOUC (see FAQ page) and keep things readable if javascript is disabled */\
	overflow-y: auto;\
	overflow-x: hidden;\
}\
\
/* Opera width restriction */\
.anythingBase {\
	max-width: 32766px;\
	background: transparent;\
	list-style: none;\
	position: fixed;\
	top: 0;\
	left: 0;\
	margin: 0;\
	padding: 0;\
	/* override the #slider overflow above, once the class is added */\
	overflow: visible !important;\
}\
\
/*************\
 ACTIVE STATE (slider has keyboard focus)\
 *************/\
/* slider window - top & bottom borders, active state */\
div.anythingSlider-default1.activeSlider .anythingWindow {\
	border-color: #6699aa;\
}\
/* Text arrows */\
div.anythingSlider-default1.activeSlider .arrow a:link {\
	color: #6699aa;\
}\
div.anythingSlider-default1.activeSlider .arrow a:hover {\
	color: #44bbcc;\
}\
/* Navigation tabs, active state */\
div.anythingSlider-default1.activeSlider .anythingControls ul a:link {\
	background-color: #6699aa;\
	color: #ddd;\
}\
div.anythingSlider-default1.activeSlider .anythingControls ul a.cur:link,\
div.anythingSlider-default1.activeSlider .anythingControls ul a:hover,\
div.anythingSlider-default1.activeSlider .anythingControls ul a.hover {\
	background-color: #44bbcc;\
}\
/* start-stop button, stopped, active state */\
div.anythingSlider-default1.activeSlider .start-stop {\
	background-color: #6699aa;\
}\
/* start-stop button, stopped, active state, hovered */\
div.anythingSlider-default1.activeSlider .start-stop:hover,\
div.anythingSlider-default1.activeSlider .start-stop.hover {\
	background-color: #44bbcc;\
}\
/* start-stop button, playing, active state */\
div.anythingSlider-default1.activeSlider .start-stop.playing:link {\
	background-color: #d00;\
}\
/* start-stop button, playing, active state, hovered */\
div.anythingSlider-default1.activeSlider .start-stop.playing:hover,\
div.anythingSlider-default1.activeSlider .start-stop.playing.hover {\
	background-color: #a00;\
}\
\
/*****************\
 DEFAULT STATE (no keyboard focus)\
 *****************/\
\
/* Slider window - top & bottom borders, default state */\
div.anythingSlider-default1 .anythingWindow {\
	border-top: 3px solid #777;\
	border-bottom: 3px solid #777;\
	overflow: hidden;\
	position: relative;\
	width: 100%;\
	height: 100%;\
}\
/* Text arrows */\
div.anythingSlider-default1 .arrow a:link {\
	color: #777;\
}\
div.anythingSlider-default1 .arrow a:hover {\
	color: #999;\
}\
/* Disabled arrows - infiniteSlide = false & stopAtEnd = true */\
div.anythingSlider-default1 .back.disabled,\
div.anythingSlider-default1 .forward.disabled {\
	display: none;\
}\
/* Navigation tabs */\
div.anythingSlider-default1 .anythingControls ul a.cur,\
div.anythingSlider-default1 .anythingControls ul a {\
	background: #777;\
	color: #ddd;\
}\
div.anythingSlider-default1 .anythingControls ul a.cur:hover,\
div.anythingSlider-default1 .anythingControls ul a.hover,\
div.anythingSlider-default1 .anythingControls ul a:hover {\
	background: #999;\
}\
/* Start/stop button - stopped */\
div.anythingSlider-default1 .start-stop {\
	background-color: #779;\
	color: #ddd;\
	font: 10px/14px Georgia, Serif;\
	width: 40px;\
	text-align: center;\
	text-decoration: none;\
	float: right;\
	z-index: 100;\
	outline: 0;\
	padding: 2px 5px;\
}\
/* Start/stop button - stopped */\
div.anythingSlider-default1 .start-stop:hover,\
div.anythingSlider-default1 .start-stop.hover {\
	background-color: #88a;\
}\
/* start/stop button - playing */\
div.anythingSlider-default1 .start-stop.playing {\
	background-color: #300;\
}\
div.anythingSlider-default1 .start-stop.playing:hover,\
div.anythingSlider-default1 .start-stop.playing.hover {\
	background-color: #700;\
}\
\
/***********************\
  COMMON SLIDER STYLING\
 ***********************/\
/* Overall Wrapper */\
div.anythingSlider-default1 {\
	display: block;\
	position: relative;\
	margin: 0 auto;\
	padding: 0; /* adjust left/right padding here to move arrows towards or away from the center */\
}\
\
/* Panels/Slides */\
.anythingBase .panel {\
	background: transparent;\
	display: block;\
	overflow: hidden;\
	float: left;\
	margin: 0;\
	padding: 0;\
}\
/* Vertical panels */\
.anythingBase .panel.vertical {\
	float: none;\
}\
\
/* Arrow buttons position */\
div.anythingSlider-default1 .arrow {\
	top: 50%;\
	position: absolute;\
	display: block;\
}\
div.anythingSlider-default1 span.back {\
	left: 0;\
}\
div.anythingSlider-default1 span.forward {\
	right: 0;\
}\
/* Arrow buttons dimensions */\
div.anythingSlider-default1 .arrow a {\
	display: block;\
	height: 48px;\
	width: 35px;\
	text-align: center;\
	text-decoration: none;\
	outline: 0;\
	margin: -26px 0 0; /* set to 1/2 height */\
}\
/* Arrow buttons text */\
div.anythingSlider-default1 .arrow a span {\
	display: block;\
	font-size: 40px;\
}\
\
/* Slider control block */\
div.anythingSlider-default1 .anythingControls {\
	outline: 0;\
	float: right;\
	position: absolute;\
	bottom: 3px;\
	right: 25px;\
	z-index: 100;\
	opacity: 0.90;\
	filter: alpha(opacity=90);\
}\
/* control list */\
div.anythingSlider-default1 .anythingControls ul {\
	float: left;\
	margin: 0;\
	padding: 0;\
}\
/* control tabs */\
div.anythingSlider-default1 .anythingControls ul li {\
	display: block;\
	float: left;\
}\
/* control links */\
div.anythingSlider-default1 .anythingControls ul a {\
	font: 10px/14px Georgia, Serif;\
	display: block;\
	height: 14px;\
	text-align: center;\
	text-decoration: none;\
	outline: 0;\
	margin: 0 5px 0 0;\
	padding: 2px 8px;\
}\
/* control nav window (navigationSize = true) */\
div.anythingSlider-default1 .anythingControls .anythingNavWindow {\
	overflow: hidden;\
	float: left;\
}\
\
/* Navigation size window arrows */\
div.anythingSlider-default1 .anythingControls li.next a span, div.anythingSlider-default1 .anythingControls li.prev a span {\
	text-indent: 1px;\
	margin-top: 3px;\
}\
div.anythingSlider-default1 .anythingControls li.prev a, div.anythingSlider-default1 .anythingControls li.next a {\
	color: #ddd;\
}\
div.anythingSlider-default1 .anythingControls li.next a:hover, div.anythingSlider-default1 .anythingControls li.prev a:hover {\
	color: #000;\
}\
");

// addJQuery courtesy of Erik Vergobbi Vold
// URL: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(main);
