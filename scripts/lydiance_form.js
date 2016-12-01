// Check if form is empty
$(document).ready(function() {
	$('#search-button').click(function() {
		if ($.trim($("#query").val()) === '') {
			alert('You did not fill out the required fields.');
			return false;
		}
		else {
			var entryText = document.getElementById('query').value;
			$('.post-auth').slideUp("slow");
			$('.ytlist').slideDown("fast");
			onClickSearch(entryText);
		}
	});
});

// for highlighting search results in step 2
var classHighlight = 'highlight';

var $thumbs = $('.search-result').click(function(e) {
    e.preventDefault();
    $thumbs.removeClass(classHighlight);
    //add the class to the currently clicked element (this)
    $(this).addClass(classHighlight);
});