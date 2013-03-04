(function( $ ){

  var methods = {
    init : function( options ) {
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var modalTop = windowHeight/2-options.height/2;
		var modalLeft = windowWidth/2-options.width/2;

		var html = new Array(), i = -1;
		html[++i] = '<div class="wi-modal-container"></div>';
		html[++i] = '<div style="width:'+options.width+'px; height:'+options.height+'px; top:'+modalTop+'px; left:'+modalLeft+'px;" class="wi-modal">';
		html[++i] = '<a class="wi-modal-close">x</a>';
		html[++i] = '<h2>'+options.title+'</h2>';	
		html[++i] = '<div>'+options.html+'</div>';
		html[++i] = '</div>';
		html[++i] = '<div class="wi-modal-background"></div>';
		this.append(html.join(''));

		return this.find('.wi-modal-close').click(onClick)
			function onClick(){
				$('.wi-modal-background').remove();
				$('.wi-modal').remove();
				$('.wi-modal-container').remove();
		}
    },

    example : function( ) {
		//stub for other plugin methods
    }

  };

  $.fn.modal = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.modal' );
    }    

  };

})( jQuery );