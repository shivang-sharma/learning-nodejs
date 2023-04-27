var connect = rquire('connect');
var url = require('url');
var app = connect();

function sayHello(req, res, next) {
    res.setHeader('ContentType', 'text/html');
    res.write('First Chunk');
    res.write("Second chunk");
    res.end("Hello connect");
}

function loggingMiddleware(req, res, next){
    console.log("The request method is ", req.method);
    console.log("The request url is ", req.url);
    console.log("The request query parameter", url.parse(req.url, true).query.name);
    next();
}

app
.use(loggingMiddleware)
.use(sayHello)
.listen(3011);