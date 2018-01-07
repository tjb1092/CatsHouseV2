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
    $(".featureImage").attr('src',newURL);
  });
});
