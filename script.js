$('#jp_playlist_2 li').each(function() {

  var el = $(this)
    , query = el.find('> a')
                .text()
                .match(/\d+\s(.+)/)[1]
                .replace('- ', '')
                .split(' ').join('%20')
    , url = 'http://ws.spotify.com/search/1/track.json?q=' + query;

  $.ajax({
      url: url
    , success: function(data) {
        var spot = data.tracks[0] && data.tracks[0].href
          , buy = el.find('.buy');
        if (spot && !buy.find('.spotify').length) {
          buy.css('width', '53px')
             .prepend('<a class="spotify" href="' + spot + '">s</a>');
        }
      }
  });

});

$('head').append('<style type="text/css">.spotify{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAeCAMAAADEgrRGAAAAzFBMVEUvLy8vLy+CgoKzs7OQkJCBgYFRUVFlZWVtbW1BQUFpaWlsbGyxsbF5eXlERERVVVVfX1+hoaF3d3dGRkZAQECMjIw7OztPT081NTV/f3+urq5ZWVljY2NdXV1KSkpeXl5UVFRWVlY8PDxMTEwyMjJxcXE4ODhNTU11dXWZmZk6Ojp9fX17e3uFhYVvb290dHR4eHiSkpJmZmabm5tcXFyGhoapqalFRUVycnJaWlqfn585OTlJSUkzMzOUlJRDQ0NLS0s0NDSjo6M9PT2B6NSMAAAAAXRSTlMAQObYZgAAAKxJREFUeF6dz8VuBEEMBNC23T3MsMzMzBvO//9TDtG4tYeVotTtWSrJJYQAHcHkAzzm1+lQWZHJnlWTpoVrdh9TgPaOXVJzp34GNrQmiNhgVzJ4DVbYK2xgB6CLtrZynWoy0A5c3y1xfzR+8jAPYv5vbzj15GLJzmrxZkt79oFCAP/Itr1TfjGADdcbESn2/QUq5Td6L2ySA2DRh7Yn81r8qV2WX9Lm/nf0570/mZUL/NBrfjMAAAAASUVORK5CYII=);display:block;margin-right:4px;text-indent:-1900em;width:15px;height:15px}.spotify:hover{background-position:0 -15px}</style>');