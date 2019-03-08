'use strict';
/**
 * @const {object} - EventEmitter 
 */
const EventEmitter = require('events').EventEmitter; 

/**
 * Clase representa LDJCLIent.
 * @extends EventEmitter
 */
class LDJClient extends EventEmitter {
constructor(stream) { 
    super();
    let buffer = ''; 
    stream.on('data', data => {
        buffer += data;
        let boundary = buffer.indexOf('\n'); while (boundary !== -1) {
            const input = buffer.substring(0, boundary); buffer = buffer.substring(boundary + 1); 
            this.emit('message', input); 
            boundary = buffer.indexOf('\n');
} });
}

/**
 * Connect
 * @function connect
 * @param {String} stream - le paso el stream
 */
static connect(stream) {
    return new LDJClient(stream);
    } }
    module.exports = LDJClient;