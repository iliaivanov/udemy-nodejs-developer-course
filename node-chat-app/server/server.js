require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    /**
     * socket.emit - sends event only to current socket/user
     * socket.broadcast - sends event for all, but current socket/user
     * socket.join('%name%') - join particular "channel"
     * socket.broadcast.to('%name%').emit - send event to particular channel for all sockets connected, but except you
     * io - sends event for all connected sockets
     * io.broadcast.to('%name%').emit - send event to particular channel for all sockets connected
     */

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        // socket.leave(params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    // callback is responsible for acknowledgement. 
    socket.on('createMessage', (newMessage, callback) => {
        console.log('New message', newMessage);

        // TODO: validation
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();    
    });

    socket.on('createLocationMessage', (location) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};