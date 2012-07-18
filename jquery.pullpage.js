
/**
 *  jQuery pullPage v0.1
 *  Author: Jon Jaques <jon@jonjaques.com>
 *  License: WTFPL 2.0 <http://sam.zoy.org/wtfpl/COPYING>
 */

(function($){
  var pullPage = function(el, options){
    // Merge defaults with options passed
    var o = $.extend({}, $.fn.pullPage.defaults, options),

    el = $(el),

    hideLink = $('<a>', {
      "href"    : '#',
      "class"   : o.hideLinkClass,
      "text"    : o.hideLinkText
    }).appendTo(el),

    windowResize = function(){
      el.css({
        width: $(window).width(),
        height: $(window).height()
      });
    },

    prepareDom = function(){

      if(o.hiddenClassEl){
        $(o.hiddenClassEl).addClass(o.hiddenClass);
      }

      $('html, body').css({
        overflow: 'hidden'
      });

      el.hide().css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: $(window).width(),
        height: $(window).height(),
        zIndex: 10000,
        overflow: 'auto'
      });

      $(window).bind('resize', windowResize);

    },

    releaseDom = function(){
      $('html, body').css({
        overflow: 'auto'
      });

      $(window).unbind('resize', windowResize);
    }

    show = function(useAutoHide){
      prepareDom();
      el.fadeIn(o.showTransition, function(){
        if(useAutoHide){
          window.setTimout(hide, o.hideDelay);
        }
      })
    },

    hide = function(){
      // Unhide the rest of the stuff before we fadeout.
      if(o.hiddenClassEl) $(o.hiddenClassEl).removeClass(o.hiddenClass);

      el.fadeOut(o.hideTransition, function(){
        releaseDom();
      });
    };

    // Add a backwards reference to element
    el.data("pullPage", this);

    if(o.showHideLink){
      hideLink
        .bind('click', hide)
        .appendTo(el);
      el.bind('dblclick', hide);
    }

    // Make an inner element to house the content
    el.wrapInner('<div class="pullPage-inner" style="position: relative">')
      .addClass(o.containerClass);

    // Only initialize if it's set in the options
    // and do so after specified timeout.
    if(o.autoShow){
      window.setTimeout(function(){
        show(o.autoHide);
      }, o.initDelay);
    }

    // Return these methods as public
    return {
      el: el,
      show: show,
      hide: hide,
      options: o
    };
  };

  $.fn.pullPage = function(options){
    return this.each(function(){
      (new pullPage(this, options));
    });
  };

  $.fn.pullPage.defaults = {
    hiddenClass     : 'pullPage-hidden',
    hiddenClassEl   : false,
    containerClass  : 'pullPage-container',    // Class for pullPage container.
    autoShow        : true,                   // Shows pullPage after `initDelay` ms.
    autoHide        : false,                  // Hides pullPage after `hideDelay` ms.
    showTransition  : 0,                      // n milliseconds for fadeIn transition
    initDelay       : 0,                      // n milliseconds before autoInit is called.
    hideDelay       : 3000,                   // n milliseconds before autoHide is called.
    hideLinkClass   : 'pullPage-hide-link',   // class for close
    hideLinkText    : 'Hide me!',
    hideTransition  : 500,                    // n milliseconds for fadeOut transition
    showHideLink    : true                    // Append a link to manually close  pullPage.
  };

})(jQuery);