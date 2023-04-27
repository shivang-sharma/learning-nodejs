var http_port = 8899
var http = require('http');
var start = function() {
    var server = http.createServer(function(req, res) {
        require('./router').get(req, res);
    });
    server.listen(http_port);
    console.log('listening to http://localhost:' + http_port);
};

exports.start = start;