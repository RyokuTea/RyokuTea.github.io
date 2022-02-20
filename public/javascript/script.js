$(function() {
/* Is #header correct instead of #scrollTop?
  $('#header').click(function(){
    $('html,body').animate({
      'scrollTop':0
    },'slow');
  });
*/
  $('#calcBtn').click(function(){
    var resValue = $('#checkedItem').val();
    if(resValue ==''){
      $('#error-message').text('Put values in these blanks!');
    } else {
      $('#error-message').text('');
    }
  });
  
  $('.change-btn').click(function() {
    var $ImgDisplay = $('.active');
    $ImgDisplay.removeClass('active');

    if($(this).hasClass('next-btn')){
      $ImgDisplay.next().addClass('active');
    } else {
      $ImgDisplay.prev().addClass('active');
    }
    toggleChangeBtn();
  });
  
  function toggleChangeBtn(){
    var index = $('.expImg').index($('.active'));
    if(index == 0){
      $('.prev-btn').hide();
      $('.next-btn').show();  
    } else if(index == ($('.expImg').length - 1)){
      $('.prev-btn').show();
      $('.next-btn').hide();
    }
  }

});
