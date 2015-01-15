/*
	Warn users of old versions of Internet Explorer about lack of support. This step is performed without jQuery.

	Note - programmer error can still cause a modern version of Internet Explorer to render incorrectly:
		- make sure to include <!doctype html>
		- make sure to include <meta http-equiv="X-UA-Compatible" content="IE=edge" > (otherwise localhost or intranet pages render in compatibility mode)

	Note - users can still override the rendering mode via the IE developer tools (F12)
		- see document.browserMode (UA string sent to server) and document.documentMode (rendered mode) for more information

	Since jQuery 1.9 $.browser is removed. Instead we use a supported indication object:
		http://tanalin.com/en/articles/ie-version-js/
		
		IE version	Supported indication object
		10+			window.atob
		9+			document.addEventListener
		8+			document.querySelector
		7+			window.XMLHttpRequest
		6+			document.compatMode
		
		Since this change the UA string / Browser mode no longer affects the detection. Detection is based solely on document mode.
*/
function oldBrowserWarning() {
	if (document.all && !document.addEventListener) { //supported indication test
	 	//create the warning message
		var browser_warning = new Array(), i = -1;
		browser_warning[++i] = '<p id="w-browser-warning" class="w-error" style="margin:0;">';
	 	browser_warning[++i] = 'You are using an old browser which is unsupported. Some features may not work correctly. ';
		browser_warning[++i] = 'Consider <a href="http://www.whatbrowser.org/intl/en_uk/">upgrading</a> to a modern browser. ';
		browser_warning[++i] = '<span id="w-dismiss-browser-warning" class="w-false-link">Dismiss.</span> ';
		browser_warning[++i] = '</p>';

		//prepend the warning message to body
	  	var warning = document.createElement('div');
	  	warning.innerHTML = browser_warning.join('');
	  	document.body.insertBefore(warning, document.body.childNodes[0]);
	}

	//event handler to make it possible to close the old browser warning
	if (document.getElementById('w-dismiss-browser-warning')) {
		document.getElementById('w-dismiss-browser-warning').onclick=function() {
			var warning = document.getElementById('w-browser-warning');
			warning.parentNode.removeChild(warning);
		};
	}
}

/*
	Use the legacy IE attachEvent(), when it exists, to fire the oldBrowserWarning test when the page is loaded
	This is in place of $(document).ready() so that the old browser warning test step is performed without jQuery.
	http://msdn.microsoft.com/en-us/library/ie/ms536343(v=vs.85).aspx
*/
if (window.attachEvent) {
	window.attachEvent( "onload", oldBrowserWarning );
}

 /*
  SVG Injector class
 */

 function svgInject() {
  this.inject = function (container) {
    container = typeof container !== 'undefined' ? container : ''; //default value
    $(container+' .w-icon').each(function () {
      var name = $(this).data('name');
      $(this).html(w_icons[name]);
    });
  };
 };

var wModal;

var datePickerOptions = {
	"show_icon" : false
};

var RecaptchaOptions = {
	theme: 'custom',
	custom_theme_widget: 'recaptcha_widget'
};

$(document).ready(function() {

 /*
  Prevent the selected breadcrumb link from being clickable
 */

 $('.w-breadcrumb li:last-child a').click(function(event) {
	event.preventDefault();
 });

 /*
  Trigger the file upload dialog when the 'fake' file upload button (or its label) is clicked
 */

 $(".w-file-input button, .w-file-input span").on("click", function(event) {
 	event.preventDefault();
  	$(this).siblings('input[type=file]').trigger('click');
 });

 /*
  Display the file upload result in the 'fake' file upload text input
 */ 
 $('input[type=file]').change(function() {
	var fileName = $(this).val().replace(/\\/g,'/') //replace windows backslashes with forward slashes
	fileName = fileName.split('/').pop(); //split path by forward slash and select the last segment (filename). This is done to remove "C:\fakepath\ inserted by the browser.
	$(this).siblings('span').text(fileName);
 });

});