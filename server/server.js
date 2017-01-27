const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
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
    socket.emit('newMessage',{
        from:'Admin',
        text:"welcome to Chat Room",
        createdAt:new Date().getTime()
    });

    //send to all expect who has joined  
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User is joined',
        createdAt:new Date().getTime()
    });
    //receive a message from CLIENT 
    socket.on('createMessage',(message)=>{
        // //this events emits the message to all users who connected this room chat 
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });

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



