const {logEvents} = require('./eventlogger'); //Import the function with same name, ofc with ./ as local file
const EventEmitter = require('events'); 

class MyEmitter extends EventEmitter{};

const newEmitter = new MyEmitter();
newEmitter.on('log', (msg)=> logEvents(msg));

setTimeout(()=>{
    newEmitter.emit('log', 'log event emitted!');
}, 2000);