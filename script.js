javascript:(function() {

  $('.playlist li').each(function() {

    // Local variables
    var el = $(this)
      , query = el.find('> a')
                  .text()
                  .match(/\d+\s(.+)/)[1]
                  .replace('- ', '')
                  .split(' ').join('%20')
      , url = 'http://ws.spotify.com/search/1/track.json?q=' + query;

    // Fetch Spotify URLs and add links to DOM
    $.ajax({
        url: url
      , success: function(data) {
          var spot = data.tracks[0] &&
                     data.tracks[0].href.replace('spotify:track:', 'http://open.spotify.com/track/')
            , buy = el.find('.buy');
          if (spot && !buy.find('.spotify').length) {
            buy.css('width', '53px')
               .prepend('<a class="spotify" href="' + spot + '">s</a>');
          }
        }
    });

  });

  // Add CSS to DOM
  $('head').append('<style type="text/css">//css</style>');

})();
