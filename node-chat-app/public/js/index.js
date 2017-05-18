var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    var formattedTime = moment(message.createdAt).format('H:mm');

    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    var formattedTime = moment(message.createdAt).format('H:mm');
    a.attr('href', message.url);

    li.text(`${message.from} ${formattedTime}: `);
    li.append(a);
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Gleb',
//     text: 'Hi'
// }, function (data) { // acknowledgement - will be called after BE aknowledgement is done.
//     console.log(data);
// });

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var $messageTextBox = $('#message-form > [name="message"]');

    socket.emit('createMessage', {
        from: 'User',
        text: $messageTextBox.val()
    }, function (data) {
        // It is acknowledgement callback! This callback is called when acknowladgement is send from BE.
        $messageTextBox.val('');
    });
});

var $locationButton = $('#send-location');

$locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('Goelocation is not supported by your browser');
    } 

    $locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        $locationButton.removeAttr('disabled').text('Send location');
    }, function (error) {
        alert('Unable to fetch location');
        $locationButton.removeAttr('disabled').text('Send location');
    });
});