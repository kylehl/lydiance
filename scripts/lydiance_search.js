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

function onClickSearch(entry) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: entry,
		maxResults: 10,
		type: 'video',
		videoCategoryId: 10 // search for music only
    });
    
    // Send the request to the API server,
    // and invoke onSearchResponse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    $('#results').empty();
	var srchItems = response.result.items;                      
	$.each(srchItems, function(index, item){
		vidTitle = item.snippet.title;  
		vidThumburl =  item.snippet.thumbnails.high.url;
		vidThumbimg = '<pre><img id="thumb" src="'+vidThumburl+'" alt="No  Image  Available." style="width:204px;height:128px"></pre>';                   

		$('#results').append('<pre>' + vidTitle + vidThumbimg + '</pre>');
	});
}