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
$(document).ready(function() {
	var classHighlight = 'active';
	var $thumbs = $('.search-result').click(function(e) {
		e.preventDefault();
		$thumbs.removeClass(classHighlight);
		//add the class to the currently clicked element (this)
		$(this).addClass(classHighlight);
	});
});

// for highlighting button groups in step 2
$(document).ready(function() {
	var classActive = 'active';
	var $buttons = $('.button-1').click(function(e) {
		e.preventDefault();
		$buttons.removeClass(classActive);
		//add the class to the currently clicked element (this)
		$(this).addClass(classActive);
	});
});

$(document).ready(function() {
	var classActive = 'active';
	var $buttons = $('.button-2').click(function(e) {
		e.preventDefault();
		$buttons.removeClass(classActive);
		//add the class to the currently clicked element (this)
		$(this).addClass(classActive);
	});
});