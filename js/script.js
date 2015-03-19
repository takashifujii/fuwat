(function($){

  var isIE8 = (window.attachEvent && !window.addEventListener)? true : false;
  if(isIE8){
    $("html").addClass('ie8');
  }

  $.fn.fuwat = function( options ){

    var defaults = {
      "duration" : 644,
      "baseDelayTime" : 36,
      "easing" : "easeOutBack",
      "opa" : 0,
      "transY" : -10,
      fuwatComplete : function(){},

      "resetButton" : false
    };

    var setting = $.extend( defaults, options );
    var wrapperDOM = $(".fuwat");

    wrapperDOM.each(function(){
      var _this = $(this);
      var textArray = $(this).text().split("");
      // 一度消す
      _this.text("");
      // 文字を配列に収納して、一つ一つを丁寧に、ドモホルンリンクルを見つめるようにspanの中へ
      _.forEach( textArray, function(n){
        _this.append("<span class='fuwatText' style='opacity: "+ setting.opa +"; z-index: 0; transform: translate3d(0, "+ setting.transY +", 0)'>" + n + "</span>");
      } );
    });



    var fuwatText = wrapperDOM.find("span");
    var methods = {
      move : function(options){
        fuwatText.each(function(i){
          var _this = $(this);
          var baseDelayTime = setting.baseDelayTime;
          var delayTime = baseDelayTime * i;
          setTimeout(function(){
            _this.stop(false, false).animate(
              { zIndex: 1, opacity: 1 },
              {
                duration: setting.duration,
                easing: setting.easing,
                step: function(num){
                  if( !$("html").hasClass('ie8') ){
                    _this.css({ transform: "translate3d( 0, " + ( setting.transY + (num * setting.transY * -1 )) + "px, 0 )" });
                  }
                },
                complete: setting.fuwatComplete()
              }
            )
          }, delayTime);
          i++
        });
      },
      resetText : function(){
        fuwatText.css({ opacity: setting.opa, zIndex: 0, transform: "translate3d(0,"+ setting.transY +", 0)" });
      }
    }

    methods.move();

    if(setting.resetButton){
      $("body").append("<button id='resetButton' style='position: fixed; top:20px; left: 20px;'>resetButton</button>");
      $("#resetButton").on("click", function(){
        methods.resetText();
        setTimeout(function(){ methods.move(); }, 500);
      }); 
    }

  }
})( jQuery )

