var express = require('express');
var app = express();
var fs = require("fs");

app.get("/listCustomers", (req, res) => {
    fs.readFile(__dirname + "/" + "customers.json", "utf8", (err, data) => {
        console.log(data);
        res.end(data);
    })
});

var server = app.listen(5555, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`REST Server listening at http://${host}:${port}`);
});