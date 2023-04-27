var compression = require('compression');
var express = require('express');
var router = express.Router();
var app = express();

app.use(compression());

// add all routes
router.get("*", (req, res) => {
    res.write("Hello");
})

app.use('/', router);
app.listen(3000);