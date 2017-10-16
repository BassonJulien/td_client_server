

const net = require('net'),
    JsonSocket = require('json-socket'),
    HOST = '127.0.0.1',
    PORT = 9838,
    JSON = require('circular-json');


const startPos = [0, 9];
const name = ['juju','lolo'];
const server = net.createServer();

let client = [];

server.listen(PORT, HOST);
server.on('end', () => {
    console.log('client disconnected');
});
let clientName = [];


server.on('connection', function(socket) { //This is a standard net.Socket

    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
    socket.nickname = name.pop();

    client.push({socket: socket.nickname, position: startPos.pop()});


//console.log('les clients : '+JSON.stringify(client));
    socket.on('message', function(pos) {
        client.map(function(x) {
            if(x.socket === socket.nickname){
                if(pos.name === "right") {
                    x.position += 1;
                    console.log('ca rentre ds la fct'+x.position);


                }
                if(pos.name === "left") {
                    x.position -= 1;
                }
            }
        });
        console.log('le tab est '+JSON.stringify(client));
        socket.sendMessage(JSON.stringify(client));

    });



});