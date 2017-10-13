
var net = require('net');
const readline = require('readline');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function () {

  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
  client.write('I am Chuck Norris!');

});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('what is your pseudo ? ', (data) => {
  // TODO: Log the answer in a database
  client.on('connection', function(data) {
      console.log('PSEUDO:' + data);

  });

  rl.close();
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
// client.on('data', function (data) {
//
//   console.log('DATA: ' + data);
//   // Close the client socket completely
//   client.destroy();
//
// });

// Add a 'close' event handler for the client socket
client.on('close', function () {
  console.log('Connection closed');
});


var net = require('net'),
    JsonSocket = require('json-socket');

var port = 9838; //The same port that the server is listening on
var host = '127.0.0.1';
var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
socket.on('connect', function() { //Don't send until we're connected
    socket.sendMessage({a: 5, b: 7});
    socket.on('message', function(message) {
        console.log('The result is: '+message.result);
    });
});
74
