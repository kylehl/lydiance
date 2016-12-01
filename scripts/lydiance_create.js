// Define some variables used to remember state.
var playlistId, playlistLength, accLength, estDuration;

// Create playlist
function createPlaylist(id, privacy, length, name) {
  playlistLength = parseInt(length, 10);
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
	  console.log('playlistId: '+playlistId); //testing
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
	  accLength = 0;
	  console.log('seedId: '+id);
	  addRelatedContent(id);
    } else {
      alert('Could not add seed.');
    }
  });
}

// Dynamically and recursively add related content
function addRelatedContent(id) {
	// check base case where accLength >= playlistLength
	if (accLength >= playlistLength) return;
	
	// for ids of related videos
    var request = gapi.client.youtube.search.list({
        part: 'id',
		maxResults: 50,
		type: 'video',
		relatedToVideoId: id
    });
	
	// get random number for next video in playlist
	var pickNum = getRandomInt(0, 49);
	
	// searching for related videos
	request.execute(function(response) {
		var result = response.result.items;
		var nextAdd = result[pickNum].id.videoId; // get next video ID
		console.log('nextAdd: '+nextAdd);
		accLength += getDuration(nextAdd); // add to accumulated time
		addNextToPlaylist(nextAdd);
		addRelatedContent(nextAdd);
	});
}

// Adding next video
function addNextToPlaylist(id) {
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
    if (!result) {
	  alert('Could not add next.');
	}
  });
}

// get duration of specified video
function getDuration(vidId) {
	var request = gapi.client.youtube.videos.list({
        part: 'contentDetails',
		id: vidId
    });
	
	request.execute(function(response) {
		var result = response.result.items;
		estDuration = Math.floor(moment.duration(result.contentDetails.duration).asMinutes());
	});
	return estDuration;
}

// Random number generator for related videos
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}