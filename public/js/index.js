var socket = io();

//Fire this even Whenever server is UP or reconnected 
socket.on('connect',function(){
    console.log('Connected to Server');


    //create chat message 
    socket.emit('createMessage',{
        'from':"sample@example.com",
        'message':'Hey I am from India'
    });
});

//Fire this event when server goes down or connection drops 
socket.on('disconnect',function(){
    console.log('disconnected from server'); 
});

//recieve a message from server 
socket.on('newMessage',function(message){
    console.log('new Message ' , message)
});