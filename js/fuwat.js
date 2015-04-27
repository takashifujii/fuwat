(function($){
  var Fuwat = window.Fuwat || {};

  Fuwat = (function() {

  	function Fuwat(element, options){
  		var _this = this;

  		_this.$fuwat = $(element);
  		_this.defaults = {
        duration : 644,
        baseDelayTime : 36,
        easing : "easeOutBack",
        opacity : 0,
        transformY : -10,
        fuwatComplete : function(){ },

        resetButton : false
  		};
      _this.setting = $.extend( _this.defaults, options );

      _this.init();
  	}

    return Fuwat;
  }());

  Fuwat.prototype = {

  	init : function(){
  		this.confetti();
  	},

  	setEvents : function(){
  		var _this = this;
  	},

  	confetti : function(){
  		var _this = this;
  		var textArray =  _this.$fuwat.text().split("");
  		console.log(textArray);

      _this.$fuwat.text("");
      for(var i=0; i<textArray.length; i++){
      	_this.$fuwat.append("<span class='fuwatText' style='opacity: "+ _this.setting.opa +"; z-index: 0; transform: translate3d(0, "+ _this.setting.transY +", 0)'>" + textArray[i] + "</span>")
      }
  	},

  	move : function(){
  		var _this = this;

  	},

  	forRepeat : function(){
  		var _this = this;

  	},

  	reset : function(){
  		var _this = this;

  	}

  }

  $.fn.fuwat = function(options){
  	var _this = this;

  	return _this.each(function(index, element){
  		element.fuwat = new Fuwat(element, options);
  	});
  }

})( jQuery )

