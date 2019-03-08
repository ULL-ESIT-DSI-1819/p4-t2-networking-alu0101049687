'use strict';
/**
 * @const {object} - Assert 
 */
const assert = require('assert');

/**
 * @const {object} - EventEmitter
 */
const EventEmitter = require('events').EventEmitter; 

/**
 * @const {object} - LDJClient
 */
const LDJClient = require('../lib/ldj-client3.js');

/**
 * Describe function
 * @function describe
 * @param {object} LDJClient - creando el cliente
 */
describe('LDJClient', () => { 
let stream = null;
let client = null;

/**
 * @function beforeEach 
 * @param {null} - Prepar antes de ejecutar
 */
beforeEach(() => {
stream = new EventEmitter(); 
client = new LDJClient(stream);
});

it('should emit two message event from a single data event', done => { 
    
     client.on('message', message => {
        assert.deepEqual(message, {foo: 'bar'});
     });
     client.on('message2', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done(); 
   });
    stream.emit('data', '{"foo":"bar"}\n'); 
    });
});