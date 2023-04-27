var template = require('../views/template-main');
exports.get = function(req, res) {
    res.writeHead(404, {'Content-Type':'text/html'});
    res.write(
        template.build(
            "404 - Page not found",
            "Oh noes, it's 404",
            "<p> this is not the page you are looking for pal"));
    res.end();
}