'use strict';
const EventEmitter = require('events').EventEmitter; 

class LDJClient extends EventEmitter {
constructor(stream) { 
    super();
    let buffer = ''; stream.on('data', data => {
        buffer += data;
        let boundary = buffer.indexOf('\n'); while (boundary !== -1) {
        const input = buffer.substring(0, boundary); 
        try {
            JSON.parse(input);
        } catch (e) {
           throw console.error("JSON not correct");  
        }
        buffer = buffer.substring(boundary + 1); 
        this.emit('message', JSON.parse(input)); 
        boundary = buffer.indexOf('\n');  
    }   
    } 
);
};

static connect(stream) {
    return new LDJClient(stream);
    } }
    module.exports = LDJClient;