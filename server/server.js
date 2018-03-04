const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const  { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();
app.use(express.static(publicPath));

app.get('/rooms', (req, res) => {
    res.send(users.rooms);
});

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        if (users.isUserExists(params.name, params.room)) {
            return callback('Name has been used.');
        }

        socket.join(params.room.toUpperCase());
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room.toUpperCase());

        io.to(params.room.toUpperCase()).emit('updateUserList', users.getUserList(params.room.toUpperCase()));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room.toUpperCase()).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', coords => {
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
        }
    })
});

server.listen(port, () => {
    console.log('Server is up on port', port);
});
