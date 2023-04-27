var seneca = require('seneca')();
seneca.add({role: 'numberTask', cmd: 'sum'}, function (msg, respond) {
    var sum = msg.left + msg.right;
    respond(null, {answer: sum});
});

seneca.add({role: 'numberTask', cmd: 'product'}, function (msg, respond) {
    var product = msg.left * msg.right;
    respond(null, {answer: product});
});

seneca.act({role:"numberTask", cmd:'sum', left:1, right:2}, console.log);
seneca.act({role:"numberTask", cmd:'product', left:3, right:2}, console.log);

