/*! Webknife vX.X.X - webknife.org | webknife.org/framework/license.txt 
!*/
var lastSupportedIEVersion = 9;

var datePickerOptions = {
	"show_icon" : false
};

var RecaptchaOptions = {
	theme: 'custom',
	custom_theme_widget: 'recaptcha_widget'
};

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
  browser_warning[++i] = '<p id="w-browser-warning" class="w-error" style="margin:0;">';
  browser_warning[++i] = 'You are using an old version of Internet Explorer which is unsupported. Some features may not work correctly. ';
  browser_warning[++i] = 'Consider <a href="http://www.whatbrowser.org/intl/en_uk/">upgrading</a> to a modern browser. ';
  browser_warning[++i] = '<span id="w-dismiss-browser-warning" class="w-false-link">Dismiss.</span> ';
  browser_warning[++i] = '</p>';
  $('body').prepend(browser_warning.join(''));
 }
}

$(document).ready(function() {

 oldBrowserWarning();	
 
 /*
  Make it possible to close the old browser warning
 */
 $('body').on('click', '#w-dismiss-browser-warning', function(){
  $("#w-browser-warning").remove();
 });

 /*
  Prevent the selected breadcrumb link from being clickable
 */
 $('.w-breadcrumb li:last-child a').click(function(event) {
	event.preventDefault();
 });

 /*
  Trigger the file upload dialog when the 'fake' file upload button is clicked
 */
 $('.w-file-input-button').click(function() {
	$(this).prev('input[type=text]').prev('input[type=file]').trigger('click');
 }); 

 /*
  Trigger the file upload dialog when the 'fake' file upload input is clicked
 */
 $('.w-file-input').click(function() {
	$(this).prev('input[type=file]').trigger('click');
 });

 /*
  Display the file upload result in the 'fake' file upload text input
 */ 
 $('input[type=file]').change(function() {
	var fileName = $(this).val().replace(/\\/g,'/') //replace windows backslashes with forward slashes
	fileName = fileName.split('/').pop(); //split path by forward slash and select the last segment (filename). This is done to remove "C:\fakepath\ inserted by the browser.
	$(this).next('input[type=text]').val(fileName);
 });

});