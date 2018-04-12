const Server = require('socket.io');

const server = new Server(3000);

server.on('connection', socket => {
    socket.on('chat', message => {
        server.emit('chat', message);        
    });

    socket.on('greeting', userName => {
        socket.emit('ready', `Welcome to chat @${userName}`);
    })
    
  
})