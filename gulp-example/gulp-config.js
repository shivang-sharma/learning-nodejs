module.exports = function() {
    var client = './'
    var config = {
        allScripts: {
            jsSrc:'./src/**/*.js',
            sassSrc: './src/**/*.scss,'
        },
        tmp: './dist',
        html: client + 'index.html',
        client: client,
        bower: {
            json: require('./bower.json'),
            components: './bower_components',
            ignore: '../..'
        }
    };
    config.wiredepOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            components: config.bower.components,
            ignore: config.bower.ignore
        }
    }
    return config;
}