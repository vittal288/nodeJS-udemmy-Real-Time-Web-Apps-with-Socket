var socket = io();

//Fire this even Whenever server is UP or reconnected 
socket.on('connect',function(){
    console.log('Connected to Server');
});

//Fire this event when server goes down or connection drops 
socket.on('disconnect',function(){
    console.log('disconnected from server'); 
});

// //recieve a message from server 
socket.on('newMessage',function(message){
    console.log('new Message ' , message)
});