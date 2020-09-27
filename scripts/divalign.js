$(window).bind("load", function() {
    var wwidth = $("#btn-div").width();
    var uwidth = $('.btn-upload-modal').width();

    console.log("Widths are "+wwidth + " and "+uwidth);
  //  $('#btn-upload').attr("style", " margin-left: " + (wwidth / 2 - uwidth/2) + "px;");
    
    $('.btn-upload-modal').attr("style", " margin-left: " + (wwidth / 2 - uwidth/2) + "px;");  
  });


   