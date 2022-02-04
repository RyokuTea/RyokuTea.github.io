$(function() {

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
});
