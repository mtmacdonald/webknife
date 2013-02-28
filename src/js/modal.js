function modal(width, height, title, html) {
 this.width = width;
 this.height = height; 
 this.title = title;
 this.html = html;
 this.visible = false;
 this.html =
  '<div id="w-internal-modal"><a id="w-internal-modal-close">x</a> \n' +
  ' <h1>'+this.title+'</h1>' +
  ' <div id="w-internal-modal-content">'+this.html+' \n' +
  ' </div> \n' +
  '</div> \n' +
  '<div id="w-internal-modal-background"></div>';
 this.show = function show() {

  if(this.visible==false){
   $('body').prepend('<div id="w-temp-modal-container"></div>');
   $('#w-temp-modal-container').after(this.html);
   $('#w-internal-modal').css({'width': this.width});
   $('#w-internal-modal').css({'height': this.height});

   this.centerDialog();
   $('#w-internal-modal-background').css({'opacity': "0.2"});
   $('#w-internal-modal-background').show();
   $('#w-internal-modal').show();
   this.visible = true;
  }
 };
 this.close = function close() {
  if(this.visible==true){
   $('#w-internal-modal-background').remove();
   $('#w-internal-modal').remove();
   $('#w-temp-modal-container').remove();
   this.visible = false;
  }
 };
 this.centerDialog = function center() { //private
   var windowWidth = document.documentElement.clientWidth;
   var windowHeight = document.documentElement.clientHeight;
   var popupHeight = $('#w-internal-modal').height();
   var popupWidth = $('#w-internal-modal').width();
   $('#w-internal-modal').css({'top': windowHeight/2-popupHeight/2,'left': windowWidth/2-popupWidth/2});
 };
}
