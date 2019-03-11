'use strict';
const net = require('net');
const client = net.connect({port: 60300}); 
console.log('Connected');

client.on('data', function(data) {

})