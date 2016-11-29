// Check if form is empty
$('#form').submit(function() {
    if ($.trim($("#fill").val()) === "") {
        alert('You did not fill out the required fields.');
        return false;
    }
});