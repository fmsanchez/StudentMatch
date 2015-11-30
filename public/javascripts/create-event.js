var ready = function() {
    $('#create-event-submit').click(function() {
    	var EVENT_TO_CREATE = {}
    	EVENT_TO_CREATE['eventName'] = $('#event-name-input').val();
    	EVENT_TO_CREATE['eventLocation'] = $('#event-location-input').val();
    	EVENT_TO_CREATE['eventCategory'] = $('#category-select').val();
    	EVENT_TO_CREATE['eventDescription'] = $('#description-input').val();
    	EVENT_TO_CREATE['startDate'] = $('#start-date-input').val();
    	EVENT_TO_CREATE['startTime'] = $('#start-time-input').val();
    	EVENT_TO_CREATE['endDate'] = $('#end-date-input').val();
    	EVENT_TO_CREATE['endTime'] = $('#end-time-input').val();
    	EVENT_TO_CREATE['eventCapacity'] = $('#capacity-input').val();

    	console.log(EVENT_TO_CREATE);

    	$.post('/events/create', EVENT_TO_CREATE, function(data) {
    		console.log(data)
    		console.log();
    		if (data=='Success') {
    			console.log('redirecting');
    			window.location.href = '/home';
    		} else {
                console.log('Error creating event');
            }
    	});

    });
}

$(document).ready(ready);
$(document).on("page:load", ready);