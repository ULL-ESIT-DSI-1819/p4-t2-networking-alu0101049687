'use strict';
/**
 * @const {object} - EventEmitter 
 */
const EventEmitter = require('events').EventEmitter;

/**
 * Clase representa LDCLient.
 * @extends EventEmitter
 */
class LDJClient extends EventEmitter {
  constructor(stream) {
 //Testability 2
    if(stream === null){
      throw Error('The stream is null');
    }
    super();
    let buffer = '';
    stream.on('data', data => {
      buffer += data;
      let boundary = buffer.indexOf('\n');
      while (boundary !== -1) {
        const input = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 1);

        //Robustness 2 - Comprobar que es de tipo JSON
        try{
          JSON.parse(input);
        }catch(e){
            throw Error("JSON not correct");  
        }
        this.emit('message', JSON.parse(input));
        boundary = buffer.indexOf('\n');
      }
    });

    //Robustness 4 - Escuchar eventos close
    stream.on('close', data => {
      let boundary = buffer.indexOf('}');
      if (boundary !== -1) {
        const input = buffer.substring(0, boundary+1);
        try{
          JSON.parse(input);
        }catch(e){
          throw Error("JSON not correct");  
        }
        this.emit('message', JSON.parse(input));
      }
      //Robustness 5 - Emite evento close
     this.emit('close');
  });
  }

/**
 * Connect
 * @function connect
 * @param {String} stream - le paso el stream
 */
  static connect(stream) {
    return new LDJClient(stream);
  }
}
//
module.exports = LDJClient;