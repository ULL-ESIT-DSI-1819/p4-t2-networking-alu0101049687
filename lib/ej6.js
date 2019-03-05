'use strict';
const EventEmitter = require('events').EventEmitter; 

class LDJClient extends EventEmitter {
constructor(stream) { 
super();
let buffer = ''; stream.on('data', data => {
buffer += data;

//Compruebo si acaba en /n
if(buffer.charAt(buffer.length-1)!="\n"){
    buffer += "\n";
}
let boundary = buffer.indexOf('\n');  //Devuelve pos del primer /n

while (boundary !== -1) {
const input = buffer.substring(0, boundary); 
buffer = buffer.substring(boundary + 1); 
this.emit('message', JSON.parse(input)); 
boundary = buffer.indexOf('\n');
}

}).on('close', function() {
    console.log("Offline");
});;
}
static connect(stream) {
    return new LDJClient(stream);
    } }
    module.exports = LDJClient;