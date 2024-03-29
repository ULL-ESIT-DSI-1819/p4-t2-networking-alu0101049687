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
const LDJClient = require('../lib/ejercicio.js');

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

  /** Test 1
   *  @function it
   * @param {string} nombre
   * @param {function} test
   */
  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });

 //Testability 1
 /** Test 2
   * @function it
   * @param {string} nombre
   * @param {function} test
   */
  it('should emit a message event from two or more data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"');
    stream.emit('data', '}\n');
  });

  //Testability 2
  /** Test 3
   * @function it
   * @param {string} nombre
   * @param {function} test
   */
  it('should throw an error when the constructor is null', done => {
    assert.throws(()=>{
        new LDJClient(null);
        });
    done();
  });
  
  //Robustness 2
  /** Test 4
   * @function it
   * @param {string} nombre
   * @param {function} test
   */
  it ('should an error when the data event is not JSON', done =>{
    assert.throws(()=>{
      stream.emit('data', '{"foo"\n');
    })
    done();
  })

  //Robustness 4
  /** Test 5
   * @function it
   * @param {string} nombre
   * @param {function} test
   */
  it ('the data event send no new line but a close event', done =>{
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  })


});