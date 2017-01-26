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

    //whenver client disconnects
    socket.on('disconnect',()=>{
        console.log('Client was disconnected');
    })
})



server.listen(PORT,()=>{
    console.log(`Server is UP and running with ${PORT}`);
});



