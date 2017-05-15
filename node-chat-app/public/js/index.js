var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});

socket.emit('createMessage', {
    from: 'Gleb',
    text: 'Hi'
}, function (data) { // acknowledgement - will be called after BE aknowledgement is done.
    console.log(data);
});
