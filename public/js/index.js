jQuery.get('/rooms', function(rooms) {
    jQuery('#rooms').html('');
    rooms.forEach(function(room) {
        var option = jQuery('<option></option>');
        option.val(room);
        jQuery('#rooms').append(option);
    });
});

