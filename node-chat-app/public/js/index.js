var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

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

    socket.emit('createMessage', {
        from: 'User',
        text: $('#message-form > [name="message"]').val()
    }, function (data) {

    });
});