require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    /**
     * socket - is kinda "private" channel - binded with client
     * io - can broadcast for all, not personally
     */

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

    // socket.broadcast.emit - Broadcast to everybody but me.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // callback is responsible for acknowledgement. 
    socket.on('createMessage', (newMessage, callback) => {
        console.log('New message', newMessage);

        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');    
    });

    socket.on('createLocationMessage', (location) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};