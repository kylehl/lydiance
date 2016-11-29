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

// Wait for button trigger
$(document).ready(function(){
    $('#search-button').click(function(){
		if ($.trim($("#query").val()) === "") {
			alert('You did not fill out the required field.');
			return false;
		}
		else {
			//var entry = document.getElementById('query').value;
			//search(entry);
		}
    });
});

function search(entry) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: entry
    });
    
    // Send the request to the API server,
    // and invoke onSearchResponse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(data) {
    showResponse(data);
}