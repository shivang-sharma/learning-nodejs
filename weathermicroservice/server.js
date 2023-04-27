const weatherApp = require('express')();

const port = 5000;

const routes = require("./apiSource/routes");

routes(weatherApp);

weatherApp.listen(port, ()=>{
    console.log("Server is running");
});