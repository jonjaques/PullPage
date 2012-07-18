# PullPage
A jQuery plugin for displaying an overlay over a regular page. Lots of options and (some) callbacks.

Great for call to action forms, advertising campaigns, splash pages, etc.

## Option Reference
PullPage can be called with the following options. If you wish to set global options,
you can modify the ```$.fn.pullPage.defaults``` object. Beware though, this overwrites
the plugin's copy of the defaults.

```javascript
$('#myPullPage').pullPage({
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
});
```

You'll want to execute this script as soon as possible, because the idea is you want to load this
'page' before anything else.

## Methods
Calling the pullPage constructor returns the following public methods.

```javascript
var myPullPage = $('#myPullPage').pullPage({ autoShow: false });

myPullPage.show();   // Show
myPullPage.hide();   // Hide
```

## CSS
The javascript takes care of most of the styling necessary, but there is a small amount of CSS
 required for the plugin to work nicely. Also, it's a good idea to put these styles close to
 the top of your document, because you want them to render ASAP.

## License

```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
```
