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
const LDJClient = require('../lib/ejercicio.js/index.js');

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

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });

 //Testability 1
  it('should emit a message event from two or more data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar'));
    process.nextTick(() => stream.emit('data', '"}\n'));
  });

  //Testability 2
  it('should throw an error when the constructor is null', done => {
    assert.throws(()=>{
        new LDJClient(null);
        });
    done();
  });

  //Robustness 2
  it ('should an error when the data event is not JSON', done =>{
    assert.throws(()=>{
      stream.emit('data', '{"foo"\n');
    })
    done();
  })

    //Robustness 4
  it ('the data event send no new line but a close event', done =>{
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  })

});