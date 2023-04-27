var cluster = require('cluster');
var http = require('http');
var numOfCPU = require('os').cpus().length;

console.log(numOfCPU);
if (cluster.isMaster) {
    for (var i=0;i<numOfCPU; i++) {
        cluster.fork();
    }
}
if (cluster.isWorker) {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('You are using ' + cluster.worker.id);
    }).listen(8080);
}
