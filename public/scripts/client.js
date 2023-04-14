/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-env jquery */
/* global document, timeago */

// Build tweet for timeline
const createTweetElement = function(tweetObj) {
  const article = $("<article class='tweet'>");
  
  const header = $("<header class='tweet-header'>");
  const headerUserSlug = $("<span class='user-slug'>").text(tweetObj.user.name);
  const headerIcon = $('<img>').attr('src', tweetObj.user.avatars);
  headerUserSlug.append(headerIcon);
  const headerHandle = $("<h3>").text(tweetObj.user.handle);
  header.append(headerUserSlug, headerHandle);
  
  const tweetContainer = $("<div class='tweet-message'>").text(tweetObj.content.text);

  const footer = $('<footer>');
  const dateTimeTweeted = timeago.format(tweetObj.created_at);
  const footerReactions = $("<div class='tweet-reactions'>");
  const flag = $("<i id='flag' class='fa-solid fa-flag'>");
  const retweet = $("<i id='retweet' class='fa-solid fa-retweet'>");
  const heart = $("<i id='heart' class='fa-solid fa-heart'>");
  footerReactions.append(flag, retweet, heart);
  footer.append(dateTimeTweeted, footerReactions);

  article.append(header, tweetContainer, footer);
  return article;
};


// Loop through all tweets in db and prepend to timeline
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const buildTweet = createTweetElement(tweet);
    $(".timeline").prepend(buildTweet);
  }
};


// Load tweets on success from endpoint
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweets) {
      renderTweets(tweets);
    }
  });
};


// Verify tweets are less than 140 characters, not null and not ''
const tweetLengthCheck = function(tweet) {
  if (tweet.length > 140) {
    displayError("Tweet must be less than 140 characters");
    return false;
  } else if (tweet === null || tweet === '') {
    displayError("Tweet must be more than 0 characters");
    return false;
  }
  return true;
};


// On form submit, post to endpoint and load tweets on success, clear tweet
const submitTweet = function(tweet) {
  tweet.submit(function(event) {
    event.preventDefault();
    const verification = tweetLengthCheck($('#tweet-text').val());
    if (verification) {
      $.post({
        url: '/tweets',
        data: $(this).serialize(),
        success: function() {
          loadTweets();
          resetState();
        }
      });
    }
  });
};


// Slides up error warning, clears input, resets counter
const resetState = function() {
  $(".error-container").slideUp();
  $("#tweet-text").val('');
  $('#count-value').text(140);
};

// Sets error message and slides down warning
const displayError = function(message) {
  $(".error").text(message);
  $(".error-container").slideDown();
};

// Scrolls to and focuses on write tweet text line
const writeTweet = function() {
  $('.down-arrow').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 500);
    $('#tweet-text').focus();
  });
};


// Runs functions
$(document).ready(function() {
  $(".error-container").slideUp(0);
  loadTweets();
  submitTweet($('#submit-tweet'));
  writeTweet();
});