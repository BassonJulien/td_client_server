

const net = require('net'),
    JsonSocket = require('json-socket'),
    HOST = '127.0.0.1',
    PORT = 9838,
    JSON = require('circular-json');


const startPos = [0, 9];

const server = net.createServer();

let client = [];

server.listen(PORT, HOST);
server.on('end', () => {
    console.log('client disconnected');
});

server.on('connection', function(socket) { //This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket

    client.push({socket: socket, position: startPos.pop()});
//console.log('les clients : '+JSON.stringify(client));
    socket.on('message', function(pos) {
        console.log('ca rentre ds la fct');
        client.map(function(x) {
            if(x === socket){
                if(pos.name === "right") {
                    x.position += 1;

                }
                if(pos.name === "left") {
                    x.position -= 1;
                }
            }
        });
        socket.sendEndMessage(JSON.stringify(client));

    });



});