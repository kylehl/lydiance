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
			var entry = document.getElementById('query').value;
			search(entry);
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
    success: function (data) {
        var row = "";
        for (i = 0; i < data.feed.entry.length; i++) {
            row += "<div class='search_item'>";
            row += "<table width='100%'>";
            row += "<tr>";
            row += "<td vAlign='top' align='left'>";
            row += "<a href='#' ><img width='120px' height='80px' src=" + data.feed.entry[i].media$group.media$thumbnail[0].url + " /></a>";
            row += "</td>";
            row += "<td vAlign='top' width='100%' align='left'>";
            row += "<a href='#' ><b>" + data.feed.entry[i].media$group.media$title.$t + "</b></a><br/>";
            row += "<span style='font-size:12px; color:#555555'>by " + data.feed.entry[i].author[0].name.$t + "</span><br/>";
            row += "<span style='font-size:12px' color:#666666>" + data.feed.entry[i].yt$statistics.viewCount + " views" + "<span><br/>";
            row += "</td>";
            row += "</tr>";
            row += "</table>";
            row += "</div>";
        }
        document.getElementById("search-results-block").innerHTML = row;
    },
    error: function () {
        alert("Error loading youtube video results");
    }
}