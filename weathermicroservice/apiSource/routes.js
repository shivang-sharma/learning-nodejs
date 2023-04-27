// create a controller object
const controller = require("./controller");

// declare a function and export it to be used in another file
module.exports = function(weatherApp){
    weatherApp.route("/about")
                .get(controller.about);
    weatherApp.route("/weather")
                .get(controller.getWeather);
};