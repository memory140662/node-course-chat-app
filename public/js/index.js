var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></lis>');
    // li.text(`${message.from}: ${message.text}`);
    li.text(message.from + ': ' +message.text);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(lcationMessage) {
    var li = jQuery('<li></lis>');
    var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from}: `);
    li.text(lcationMessage.from + ': ');
    a.attr('href', lcationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolcation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location.')
    });
});