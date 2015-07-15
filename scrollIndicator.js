/*!
 * Simple scroll indicator
 * Author: Jon Bloomer
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "scrollIndicator";
        defaults = {};

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.docHeight = $(document).height();
        this.init();
    }

    Plugin.prototype = {

        init: function() {

          this.renderComponent(); // render the html to the screen
    			this.calcScrollVal();
    			this.calcIndicatorPos();

          $(window).resize(function() {
      			this.calcIndicatorPos();
      		});
        },

        renderComponent: function() {
    			var _html = '<div class="scroll-indicator"><i class="icon chevron-down"></i></div>';
    			$(_html).appendTo('body');
    		},

        destroyComponent: function() {
          $('.scroll-indicator').remove();
        },

        /* calculate scroll value to hide component */
        calcScrollVal: function() {
          var _self = this;
          $(document).scroll(function() {
    				var y = $(this).scrollTop();
            var docHeight = $('.home-price-page').height();
            var headerHeight = $('header').height();
            var footerHeight = $('footer').height();
            docHeight = docHeight - headerHeight - footerHeight;

    				if (docHeight <= (y + 400)) {
    					$('.scroll-indicator').fadeOut();
    				}else{
    					$('.scroll-indicator').fadeIn();
    				}
    			});
    		},

        /* calculate where indicator should sit */
        calcIndicatorPos: function() {
    			// get left pos using .bd as a reference
    			var pos = $('.bd').position();
    			var lPos = pos.left;
    			var bd_width = $('.bd').width();
          if ($(document).width() > 1100) {
      			var indicatorPos = bd_width + lPos + 30;
            $('.scroll-indicator').removeClass('box-shadow');
          }else{
      			var indicatorPos = bd_width + lPos - 25;
            $('.scroll-indicator').addClass('box-shadow');
          }
    			$('.scroll-indicator').css('left', indicatorPos);
    		}

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
