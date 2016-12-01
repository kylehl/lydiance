// Define some variables used to remember state.
var playlistId, channelId;

// Create playlist
function createPlaylist(privacy, length, name) {
  
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: 'Test Playlist',
        description: 'A private playlist created with the YouTube API'
      },
      status: {
        privacyStatus: 'private'
      }
    }
  });
  request.execute(function(response) {
    var result = response.result;
    if (result) {
      playlistId = result.id;
      $('#playlist-id').val(playlistId);
      $('#playlist-title').html(result.snippet.title);
      $('#playlist-description').html(result.snippet.description);
    } else {
      $('#status').html('Could not create playlist');
    }
  });
}