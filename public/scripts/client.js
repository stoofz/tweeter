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

  const headerUserSlug = $("<div class='user-slug'>");

  const headerIcon = $('<img>').attr('src', tweetObj.user.avatars);
  const headerName = $("<span id='user-slug-name'>");
  headerName.append(tweetObj.user.name);
  
  headerUserSlug.append(headerIcon, headerName);

  const headerHandle = $("<span id='tweet-author'>");
  headerHandle.append(tweetObj.user.handle);
  
  header.append(headerUserSlug, headerHandle);
  
  const tweetContainer = $("<div class='tweet-message'>");
  tweetContainer.append(tweetObj.content.text);
  
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
    $("#tweet-timeline").prepend(buildTweet);
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

const tweetLengthCheck = function(tweet) {
  if (tweet.length > 140) {
    return "Tweet must be less than 140 characters";
  } else if (tweet === null || tweet === '') {
    return "Tweet must be more than 0 characters";
  }
  return;
};


// On form submit, post to endpoint and load tweets on success, clear tweet
const submitTweet = function(tweet) {
  tweet.submit(function(event) {
    event.preventDefault();
    const verification = tweetLengthCheck($('#tweet-text').val());
    if (!verification) {
      $.post({
        url: '/tweets',
        data: $(this).serialize(),
        success: function() {
          loadTweets();
          $("#tweet-text").val('');
        }
      });
    } else {
      alert(verification);
    }
  });
};

// Runs functions
$(document).ready(function() {
  loadTweets();
  submitTweet($('#submit-tweet'));
});

