var fs = require('fs');

fs.open('./sample.txt', 'r', function(err, file) {
    if (err) {
        console.log(err);
    } else {
        fs.read(file, function(err, bytesRead, buffer) {
            console.log(err);
            console.log(bytesRead);
            console.log(buffer.toLocaleString());
        })
        fs.close(file, function(err) {
            console.log(err);
        })
    }
})