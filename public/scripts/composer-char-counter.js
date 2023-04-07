$(document).ready(function() {
  
  $('#tweet-text').on('keyup', function(e) {

    // Adjust count based on key down events subtracted from max characters
    const charCount = $(this).val().length;
    const charsLeft = 140 - charCount;

    // Update counter on page
    const pageCounter = $('#count-value');
    pageCounter.text(charsLeft);
    if (charsLeft > 0) {
      pageCounter.css('color', '#545149');
    } else {
      pageCounter.css('color', '#FF0000');
    }
  });
});