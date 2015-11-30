var ready = function() {
    $('#create-button').click(function() {
        window.location.href = '/events/create';
    });
    $('.event-card').click(function() {
    	var eventId = $(this).attr('data-id');
    	window.location.href = '/events/' + eventId
    });
    $('#events-button').click(function() {
    	console.log('click');
    	$('.header-button').removeClass('selected-button');
    	$(this).addClass('selected-button');
    	$('#events-tab').css('display', 'block');
    	$('#attending-tab').css('display', 'none');
    });
    $('#attending-button').click(function() {
    	console.log('click');
    	$('.header-button').removeClass('selected-button');
    	$(this).addClass('selected-button');
    	$('#events-tab').css('display', 'none');
    	$('#attending-tab').css('display', 'block');
    });
}

$(document).ready(ready);
$(document).on("page:load", ready);