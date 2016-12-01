// Check if form in step 1 is empty
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

// Check if form in step 2 is empty
$(document).ready(function() {
	$('#create-button').click(function() {
		if ($.trim($("#playlist-name").val()) === '') {
			alert('You did not fill out the required fields.');
			return false;
		}
		else {
			var privacy = document.getElementById('button-1').value;
			var length = document.getElementById('button-2').value;
			var name = document.getElementById('playlist-name').value;
			alert(privacy + length + name);
			//createPlaylist(privacy, length, name);
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
		$buttons.removeAttr('id');
		//add the class to the currently clicked element (this)
		$(this).addClass(classActive);
		$(this).attr('id', 'button-1');
	});
});

$(document).ready(function() {
	var classActive = 'active';
	var $buttons = $('.button-2').click(function(e) {
		e.preventDefault();
		$buttons.removeClass(classActive);
		$buttons.removeAttr('id');
		//add the class to the currently clicked element (this)
		$(this).addClass(classActive);
		$(this).attr('id', 'button-2');
	});
});