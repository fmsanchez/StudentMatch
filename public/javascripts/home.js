var ready = function() {
    $('#create-button').click(function() {
        window.location.href = '/events/create';
    });
    $('.event-card').click(function() {
    	var eventId = $(this).attr('data-id');
    	window.location.href = '/events/' + eventId
    })
}

$(document).ready(ready);
$(document).on("page:load", ready);