(function($){
  var Fuwat = (function() {

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
      var _this = this;

  		_this.wordSplit();
      _this.setEvents();
  	},

  	setEvents : function(){
  		var _this = this;
      var rButton = $("#resetButton");

      _this.move();

      rButton.on("click", function(){
        _this.reset();
        setTimeout(function(){ _this.move(); }, 300);
      }); 
  	},

  	wordSplit : function(){
  		var _this = this;
  		var textArray =  _this.$fuwat.text().split("");

      _this.$fuwat.text("");
      for(var i=0; i<textArray.length; i++){
      	_this.$fuwat.append("<span class='fuwatText' style='opacity: "+ _this.setting.opacity +"; z-index: 0; transform: translate3d(0, "+ _this.setting.transformY +", 0)'>" + textArray[i] + "</span>")
      }
  	},

  	move : function(){
  		var _this = this;

      _this.$fuwat.find(".fuwatText").each(function(i){
        var $this = $(this);
        var baseDelayTime = _this.setting.baseDelayTime;
        var delayTime = baseDelayTime * i;

        setTimeout(function(){
          $this.stop(false, false).animate(
            { zIndex : 1, opacity : 1 },
            {
              duration : _this.setting.duration,
              easing : _this.setting.easing,
              step : function(num){
                $this.css({ transform : "translate3d(0 ," + (_this.setting.transformY + ( num * _this.setting.transformY * -1 )) + "px ,0)" });
              },
              complete : _this.setting.fuwatComplete()
            }
          )
        }, delayTime);
        i++;
      });
  	},

  	reset : function(){
  		var _this = this;

      $(".fuwatText").css({ opacity: _this.setting.opacity, zIndex: 0, transform: "translate3d(0,"+ _this.setting.transformY +", 0)" });
  	}

  }

  $.fn.fuwat = function(options){
  	var _this = this;

  	return _this.each(function(index, element){
  		element.fuwat = new Fuwat(element, options);
  	});
  }

})( jQuery )

