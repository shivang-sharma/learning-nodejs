var events = require('events');
var emitter = new events.EventEmitter();
var eventHandler = function connected() {
    console.log("Connect to me .......");
    emitter.emit("data_received");
};

emitter.on("connection", eventHandler);
emitter.on("data_received", () => {
    console.log("data_received fired successfully");
});

emitter.emit("connection");
console.log("reached end");