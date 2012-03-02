/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.6
	Theme 	: Forch 1.0
	
	Site	: https://github.com/KingMob/4chan-slideshow
	Author	: Matthew Davidson
	License : MIT License / GPL License
	Notes	: A heavily stripped version of Sam Gunn's Shutter theme
*/

(function($){
	theme = {
	 	
	 	
	 	/* Initial Placement
		----------------------------*/
	 	_init : function(){
	 		
	 		// Center Slide Links
	 		if (api.options.slide_links) $(vars.slide_list).css('margin-left', -$(vars.slide_list).width()/2);
	 		
			// Start progressbar if autoplay enabled
    		if (api.options.autoplay){
			}else{
				if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", vars.image_path + "play.png");	// If pause play button is image, swap src
				if (api.options.progress_bar) $(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );	//  Place progress bar
			}
			
			
			// Display total slides
			if ($(vars.slide_total).length){
				$(vars.slide_total).html(api.options.slides.length);
			}
			
			
		    $(vars.play_button).click(function() {
				api.playToggle();						    
		    });
	 	},
	 	
	 	
	 	/* Play & Pause Toggle
		----------------------------*/
	 	playToggle : function(state){
	 		
	 		if (state =='play'){
	 			// If image, swap to pause
	 			if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", pausepng);
	 		}
	 		else if (state == 'pause'){
	 			// If image, swap to play
	 			if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", playpng);
	 		}
	 	},
	 	
	 	
	 	/* Before Slide Transition
		----------------------------*/
	 	beforeAnimation : function(direction){
		  	
		  	/* Update Fields
		  	----------------------------*/
		    // Update slide number
			if (vars.slide_current.length){
			    $(vars.slide_current).html(vars.current_slide + 1);
			}
	 	},
	 	
	 	
	 	/* After Slide Transition
		----------------------------*/
	 	afterAnimation : function(){
	 		
	 	}
	 };
	 
	 
	 /* Theme Specific Variables
	 ----------------------------*/
	 $.supersized.themeVars = {
		// General Elements							
		play_button			:	'#pauseplay',		// Play/Pause button
		
		slide_current		:	'.slidenumber',		// Current slide number
		slide_total			:	'.totalslides',		// Total Slides
	 };												
	
	 /* Theme Specific Options
	 ----------------------------*/												
	 $.supersized.themeOptions = {					
	 						   		
	 };
	
	
})(jQuery);