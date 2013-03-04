(function( $ ){

  var methods = {
    init : function( options ) {
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;

		var html = new Array(), i = -1;
		html[++i] = '<div class="wi-modal-container"></div>';
		html[++i] = '<div style="width:'+options.width+'px; height:'+options.height+'px;" class="wi-modal">';
		html[++i] = '<a class="wi-modal-close">x</a>';
		html[++i] = '<h1>'+options.title+'</h1>';	
		html[++i] = '<div class="wi-modal-content">'+options.html+'</div>';
		html[++i] = '</div>';
		html[++i] = '<div class="wi-modal-background"></div>';
		this.append(html.join(''));

		$('.wi-modal-background').css({'opacity': "0.2"});
		$('.wi-modal-background').show();
		$('.wi-modal').show();

		var popupHeight = $('.wi-modal').height();
		var popupWidth = $('.wi-modal').width();
		$('.wi-modal').css({'top': windowHeight/2-popupHeight/2,'left': windowWidth/2-popupWidth/2});

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