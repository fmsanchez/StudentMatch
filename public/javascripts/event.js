var ready = function() {
    $('#event-attend-button').click(function() {
        var EVENT_TO_ATTEND = {};
        EVENT_TO_ATTEND['eventId'] = $('#event-info').attr('data-id');
        EVENT_TO_ATTEND['newCapacity'] = $('#event-info').attr('attending');
        console.log(EVENT_TO_ATTEND);
        $.post('/events/attend', EVENT_TO_ATTEND, function(data) {
            window.location.href='/home';
        });
    });
}

$(document).ready(ready);
$(document).on("page:load", ready);