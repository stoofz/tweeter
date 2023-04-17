$(document).ready(function() {
  
  $('#tweet-text').on('keyup', function() {

    // Adjust count based on key up events subtracted from max characters
    const charCount = $(this).val().length;
    const charsLeft = 140 - charCount;

    // Update counter on page via DOM travel, $('#count-value'); would be more explicit.
    const pageCounter = $(this).parent().children('.sub-tweet').children('.counter');
    pageCounter.text(charsLeft);
    if (charsLeft > 0) {
      pageCounter.css({ color: '#545149' });
    } else {
      pageCounter.css({ color: '#FF0000' });
    }
  });
});