$(document).ready(function() {
  
  $('#tweet-text').on('keydown', function(e) {

    // Assign counter variable by id
    const pageCounter = $('#count-value');

    // Adjust count based on key down events
    const charsLeft = pageCounter.val() - 1;

    // Update counter on page
    pageCounter.text(charsLeft);
    if (charsLeft > 0) {
      pageCounter.css('color', '#545149');
    } else {
      pageCounter.css('color', '#FF0000');
    }
  });
});