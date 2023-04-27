// create a variable referencing to the package.json file
let properties = require("../package.json");

// create a variable and require the weather file inside the service folder
let weather = require("../service/weather");

// create an object
let controllers = {
    about: (req, res)=>{
        //create an object and access the values in the package.json file
        let aboutInfo ={
            name: properties.name,
            description: properties.description,
            author: properties.author 
        }
        // return the object in json format
        res.json(aboutInfo);
    },
    
    getWeather: function(req, res){
        //call the find method on the weather module
        weather.find(req, res, function(err, weath) {
            if(err)
                res.send(err);
            res.json(weath);
        });
    },
};

//export the controller module so it can be use in another file within the application
module.exports = controllers;
