$(function() {
  $('#menu-icon').click(function() {
    $('#menu').fadeIn();
    $('#close-icon').fadeIn();
    $('#menu-icon').fadeOut();
    $('#header').css({
      height: "100%"
    })
  });

  $('#close-icon').click(function() {
    $('#menu').fadeOut();
    $('#close-icon').fadeOut();
    $('#menu-icon').fadeIn();
    $('#header').css({
      height: "40px"
    })
  })
  
  /*  hearder.htmlに直接実装に変更
  $('.menu-list-item').click(function() {
    var $subMenu = $(this).find('div');
    if($subMenu.hasClass('open')){
      $subMenu.fadeOut();
      $subMenu.removeClass('open');
    } else {
      $subMenu.fadeIn();
      $subMenu.addClass('open');
    }
  });
  */
});
