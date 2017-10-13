

const net = require('net'),
    JsonSocket = require('json-socket'),
    port = 9838;


const server = net.createServer((socket) => {
    socket.end('goodbye\n');
}).on('error', (err) => {
    // handle errors here
    throw err;
});



server.listen(port);
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
});

server.on('connection', function(socket) { //This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket

    socket.on('message', function(message,client) {

        if(socket===client){
            let result = moi +" : "+ message.text;
            socket.sendEndMessage({result: result});
        }
        else{
            let result = message.pseudo + message.text;
            socket.sendEndMessage({result: result});
        }

    });
    socket.on('identification', function(pseudo,client) {
        if(socket===client){
            socket.sendEndMessage({result: " bienvenu "+pseudo});
        }
        else{
            socket.sendEndMessage({result: pseudo+" vient de se connecter"});
        }

    });
    socket.on('sendDecoMsg', function(pseudo) {
        socket.sendEndMessage({result: pseudo+" vient de se déconnecter"});
    });
    socket.on('deco', function(pseudo) {
       socket.close();
    });
});