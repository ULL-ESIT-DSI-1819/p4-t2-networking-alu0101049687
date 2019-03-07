'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter; 
const LDJClient = require('../lib/ldj-client2.js');

describe('LDJClient', () => { 
let stream = null;
let client = null;

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

