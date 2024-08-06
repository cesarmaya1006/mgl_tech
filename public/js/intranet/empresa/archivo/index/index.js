$(document).ready(function () {
      $('.linkImagenesArchivo').hover(function() {
        $(this).parent().css('background-color', 'rgba(200,200,200,0.7)');
      }, function() {
        // on mouseout, reset the background colour
        $(this).parent().css('background-color', '');
      });
});
