/**
 *  jQuery pullPage v0.2
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
    }).appendTo(el);

    // Add a backwards reference to element
    el.data("pullPage", this);

    // Make an inner element to house the content
    el.wrapInner('<div class="pullPage-inner" style="position: relative">')
      .addClass(o.containerClass);

    var windowResize = function(){
      el.css({
        width: $(window).width(),
        height: $(window).height()
      });
    },

    prepareWindow = function(){
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

    releaseWindow = function(){
      $(window).unbind('resize', windowResize);

      $('html, body').css({
        overflow: 'auto'
      });
    },

    show = function(useAutoHide){
      prepareWindow();

      el.fadeIn(o.showTransition, function(){
        o.pageLoaded();
        if(useAutoHide){
          window.setTimout(hide, o.hideDelay);
        }
      });

      return false;
    },

    hide = function(){
      // Unhide the rest of the stuff before we fadeout.
      if(o.hiddenClassEl) $(o.hiddenClassEl).removeClass(o.hiddenClass);

      o.pageOnExit();

      el.fadeOut(o.hideTransition, function(){
        releaseWindow();
      });

      return false;
    };

    if(o.showHideLink){
      hideLink
        .bind('click', hide)
        .appendTo(el);
      el.bind('dblclick', hide);
    }

    // Only initialize if it's set in the options
    // and do so after specified timeout.
    if(o.autoShow){
      window.setTimeout(function(){
        show(o.autoHide);
      }, o.initDelay);
    }

    return {
      el: el,
      show: show,
      hide: hide
    };
  };

  $.fn.pullPage = function(options){
    return this.each(function(){
      (new pullPage(this, options));
    });
  };

  $.fn.pullPage.defaults = {
    autoShow        : true,                   // Shows pullPage as soon as it's initialized.
    autoHide        : false,                  // Hides pullPage after activated.
    initDelay       : 0,                      // Delay setting for `autoShow`
    hideDelay       : 3000,                   // Delay setting for `autoHide`
    showTransition  : 0,                      // Milliseconds for pullPage fadeIn transition
    hideTransition  : 500,                    // Milliseconds for pullPage fadeOut transition
    showHideLink    : true,                   // Append a link to manually close  pullPage.
    hideLinkText    : 'Hide',                 // Text to display inside the hide link
    hideLinkClass   : 'pullPage-hide-link',   // Class for hide link
    containerClass  : 'pullPage-container',   // Class for pullPage container.
    hiddenClass     : 'pullPage-hidden',      // This class should be applied to the container
                                              // for the rest of your site. Cannot be applied to the body.
    hiddenClassEl   : $('#siteContainer'),    // Specify a $ selector for the element to apply
                                              // the hiddenClass to. Pass false to not set a class.
    pageLoaded      : function(){},           // Called immediately after the pullPage is loaded.
    pageOnExit      : function(){}            // Called right before the page is transitioned out.
  };

})(jQuery);