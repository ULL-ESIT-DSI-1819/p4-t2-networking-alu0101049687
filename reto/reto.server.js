'use strict';
const fs = require('fs');
const net = require('net');
var cont = 0;
let arr = [];

net.createServer(connection => {
cont++;
console.log('Guest'+cont+' connected.');

arr.push(connection);
connection.on('close', () => { console.log('Guest'+cont+' disconnected.'); 
let index = arr.indexOf(connection);

arr.splice(index, 1);
});

connection.on('data', function(data) {
    let inde = arr.indexOf(connection);

     for(let index = 0; index < arr.length; index++){
         if(index!=inde){
        const element = arr[index];
        element.write('guest'+inde+' says: '+data);
         }  
    }
});
}).listen(60300, () => console.log('Listening for guests...'));
