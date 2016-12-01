// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
	console.log(response);
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAYquJl6tEYy2oMlNjXGneGKC7qJfCgTXA');
}

// Below is the chain of functions from clicking Go in the search bar
function onClickSearch(entry) {
    // for snippet info
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: entry,
		maxResults: 10,
		type: 'video',
		videoCategoryId: 10 // search for music only
    });
	
	// for id info
    var requestId = gapi.client.youtube.search.list({
        part: 'id',
        q: entry,
		maxResults: 10,
		type: 'video',
		videoCategoryId: 10 // search for music only
    });
    
    // Send the request to the API server,
    // and invoke onSearchResponse() with the response.
	requestId.execute(getVideoId);
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
var sVideoIds = []; // global var array for search data

// API call for id search
function getVideoId(response) {
	var srchItems = response.result.items;
	$.each(srchItems, function(index, item){
		sVideoIds[index] = item.id.videoId;
		console.log(sVideoIds[index]);
	});
}

function onSearchResponse(response) {
    $('#results').empty();
	var srchItems = response.result.items;
	
	$.each(srchItems, function(index, item){
		var vidTitle = item.snippet.title;
		var vidThumburl =  item.snippet.thumbnails.high.url;
		var vidId = sVideoIds[index];
		console.log(vidId);
		var vidThumbimg = '<pre><img id="thumb" src="'+vidThumburl+'" alt="No  Image  Available." style="width:auto;height:20%"><button type="button" class="btn btn-lg btn-default search-result" id="select-'+index+'" value="'+vidId+'">Select</button></pre>';                   
		console.log(document.getElementById('select-'+index).value);
		$('#results').append('<pre>' + vidTitle + vidThumbimg + '</pre>');
	});
}