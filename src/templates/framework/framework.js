var lastSupportedIEVersion = 9;

function oldBrowserWarning(){
 /*
	Warn users of old versions of Internet Explorer about lack of support.

	Note - programmer error can still cause a modern version of Internet Explorer to render incorrectly:
		- make sure to include <!doctype html>
		- make sure to include <meta http-equiv="X-UA-Compatible" content="IE=edge" > (otherwise localhost or intranet pages render in compatibility mode)
		
	Note - users can still override the rendering mode via the IE developer tools (F12)
		- see document.browserMode and document.documentMode for more information
		- however no user warning is shown where the user has broken the mode themselves
 */
 if ($.browser.msie && $.browser.version < lastSupportedIEVersion){
  var browser_warning = new Array(), i = -1;
  browser_warning[++i] = '<p id="browser_warning" class="warning">';
  browser_warning[++i] = 'You are using an old version of Internet Explorer which is unsupported. Some features may not work correctly. ';
  browser_warning[++i] = 'Consider <a href="http://www.whatbrowser.org/intl/en_uk/">upgrading</a> to a modern browser. ';
  browser_warning[++i] = '<span id="dismiss_browser_warning" class="falseLink">Dismiss.</span> ';
  browser_warning[++i] = '</p>';
  $('body').prepend(browser_warning.join(''));
 }
}

$(document).ready(function() {

 oldBrowserWarning();	
 
 $('body').on('click', '#dismiss_browser_warning', function(){
  $("#browser_warning").remove();
 });
 
});