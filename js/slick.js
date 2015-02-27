(function($){
	'use strict';
	var Slick
})( jQuery )

$(function(){
	var sb = $("#sliderBox");
	var sbWidth = sb.innerWidth();
	var now = 1;

	sb.wrap('<div class="sliderWrapper"></div>');
	var elementFirst = $(".slide").first();
	var elementLast = $(".slide").last();
	sb.append(elementFirst.clone(true)).prepend(elementLast.clone(true));

	var howmanySlides = sb.find(".slide").length;

	sb.css({
		width: sbWidth * howmanySlides,
		"transform": "translate3d("+(-sbWidth)+"px, 0px, 0px)"
	});

	setInterval(function(){
		if(now > howmanySlides - 1){
			now = 1;
		} else {
			now++;
		}
		sb.animate({ step: -sbWidth*now}, {
			step: function(now, fx){
				$(this).css('transform', 'translate3d('+now+'px, 0px, 0px)');
			},
			duration: 1000
		}, 'linear');
	}, 1000);
});

function animateSlide(targetLeft, callback){
	// var 
}