// Check if form is empty
$('#search-button').submit(function() {
    if ($.trim($("#query").val()) === "") {
        alert('You did not fill out the required fields.');
        return false;
    }
	else {
		var entryText = document.getElementById('query').value;
		$('.ytlist').slideDown("fast");
		search(entryText);
	}
});