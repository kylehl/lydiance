// Define some variables used to remember state.
var playlistId, playlistLength;

// Create playlist
function createPlaylist(id, privacy, length, name) {
  playlistLength = length;
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: name,
        description: 'A playlist created using Lydiance through YouTube API. https://kylehl.github.io/lydiance/'
      },
      status: {
        privacyStatus: privacy
      }
    }
  });
  request.execute(function(response) {
    var result = response.result;
    if (result) {
      playlistId = result.id;
	  console.log(playlistId); //testing
	  $("a[href='https://www.youtube.com/']").attr('href', 'https://www.youtube.com/playlist?list='+playlistId);
	  addSeedToPlaylist(id);
    } else {
      alert('Could not create playlist.');
    }
  });
}

// Adding seed
function addSeedToPlaylist(id) {
  var details = {
	videoId: id,
    kind: 'youtube#video'
  }
  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: playlistId,
        resourceId: details
      }
    }
  });
  request.execute(function(response) {
	var result = response.result;
    if (result) {
	  addRelatedContent(id, );
    } else {
      alert('Could not add seed.');
    }
  });
}

// Dynamically add related content
function addRelatedContent(id) {
	
}