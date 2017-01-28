const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
//------------------------------------------
var app = express();
var server = http.createServer(app);
var PORT = process.env.PORT || 3000;
var publicPath = path.join(__dirname+'./../public');
console.log(publicPath);


app.use(express.static(publicPath));

var io = socketIO(server);
//whenver client is connected
io.on('connection',(socket)=>{
    console.log('Client is connected');

    //gree to the user who joined the chat room 
    socket.emit('newMessage',generateMessage('Admin','welcome to the chat app'));

    //send to all expect who has joined  
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User is joined'));
    //receive a message from CLIENT 
    socket.on('createMessage',(message,callback)=>{
        console.log(message);
        // //this events emits the message to all users who connected this room chat 
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from server');
        //send to evverybody but specefic to one , everyone can see the data but expect who sent that
        // socket.broadcast.emit('newMessage',{
        //     form:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });

    //whenver client disconnects
    socket.on('disconnect',()=>{
        console.log('Client was disconnected');
    });
});



server.listen(PORT,()=>{
    console.log(`Server is UP and running with ${PORT}`);
});



