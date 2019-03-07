'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter; 
const LDJClient = require('../lib/ldj-client3.js');

describe('LDJClient', () => { 
let stream = null;
let client = null;

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