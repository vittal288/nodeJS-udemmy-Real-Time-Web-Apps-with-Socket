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
    
    var li = jQuery('<li><li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);

});




jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(data){
        console.log('This is form server',data);
    })
});