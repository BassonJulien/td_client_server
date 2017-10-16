
var net = require('net'),
    JsonSocket = require('json-socket');

var port = 9838; //The same port that the server is listening on
var host = '127.0.0.1';
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);



var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
socket.connect(port, host);
socket.on('connect', function() { //Don't send until we're connected
    // listen for the "keypress" event


    process.stdin.on('keypress', function (ch, key) {
        console.log('got "keypress"', key.name);

        socket.sendMessage(key);


        if (key && key.ctrl && key.name == 'c') {
            process.stdin.pause();
        }
    });
    socket.on('message', function(data) {

        console.log(data);

    });
});

process.stdin.setRawMode(true);
process.stdin.resume();
