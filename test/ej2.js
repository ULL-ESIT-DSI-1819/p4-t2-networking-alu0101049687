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
const LDJClient = require('../lib/ldj-client2.js');

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
})

it('should throw an error when the constructor is null', done => { 
    try {
        client = new LDJClient(null);
      }
      catch (error) {
        done();
      }
});})

