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