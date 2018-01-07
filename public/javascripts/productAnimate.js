



$(document).ready(function(){

  $(".buttonleft").click(function(){
    let qty = $("input#quantity").attr('value');

    qty = Number(qty);
    qty--;
    if(qty < 0){
      qty = 0;
    }
    $("#quantity").attr('value', qty.toString());
  });

  $(".buttonright").click(function(){
    let qty = $("input#quantity").attr('value');

    qty = Number(qty);
    qty++;
    $("#quantity").attr('value', qty.toString());
  });

  $(".ScrollThumbnail").on('mouseenter', function(){
    var newURL = $(this).attr('src');
    $("#featureImage").attr('src',newURL);
  });

  $("#featureImage:first").on('mouseenter',function(){
    var img, lens, result, cx, cy;
    img = this;

    result = $('#ZoomResult');
    result = result[0];

    // Create Lens
    lens = $('.img-zoom-lens');
    if(lens.length == 0){
      // Insert lens
      lens = document.createElement("DIV");
      lens.setAttribute("class", "img-zoom-lens");
      img.parentElement.insertBefore(lens, img);

      // Execute a function when someone move the cursor over the image or the lens
      lens.addEventListener("mousemove", moveLens);
      img.addEventListener("mousemove", moveLens);

      //Also for touch screens
      lens.addEventListener("touchmove", moveLens);
      lens.addEventListener("touchmove", moveLens);

    }

    // calculate the ratio between result DIV and lens
    result.style.visibility ="visible";
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    // Set backgroup properties for the result div
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width*cx) + "px " + (img.height * cy) + "px";

    function moveLens(e){
      var pos, x, y;
      // Prevent any other actions that may occur when moving over the image
      e.preventDefault();

      // Get the cursor's x and y positions
      pos = getCursorPos(e);
      //var manXOffset = 50;
      // Calculate the  position of the lens
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);

      // Prevent the lens from being positioned outside the image
      if(x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight){
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }

      // Set Lens position
      lens.style.left = x+ "px";
      lens.style.top = y + "px";
      // Display what the lens sees
      result.style.backgroundPosition ="-" + (x*cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x=0, y=0;
      e = e || window.event;
        // Get the x and y positions of the image
      a = img.getBoundingClientRect();

      // Calculate the cursor's x and y coordinates relative to the image
      x = e.pageX  - a.left;
      y = e.pageY - a.top;

      // Consider any page scrolling
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x: x, y: y}
    }
  });

  $(".feature-image").on('mouseleave',function(){
    result = $('#ZoomResult');
    result = result[0];
    result.style.visibility='hidden';
  });
  $(".feature-image").on('mouseenter',function(e){
    result = $('#ZoomResult');
    result = result[0];
    result.style.visibility='visible';
    result.style.backgroundImage = "url('" + $("#featureImage:first").attr('src') + "')";


  });
});
