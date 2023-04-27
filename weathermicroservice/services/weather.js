// declare the request package we added to the package.json
let request = require("request");

// assign your api key and api url to a variable
const apiKey = "your own api key";
const apiUrl = "your api url as provided on your dashboard";

let weather = {
    find: (req, res, next)=>{
        request(apiUrl + apiKey + "/weather.json" + req.params.weather,
        function(error, response, body){
            //check that there is no error
            if(!error && response.statusCode==200){
                response = JSON.parse(body);
                res.send(response);
            }else{
                console.log(response.statusCode + response.body);
                res.send("An error occurred, it could be from your api");
            }
        });
    }
};

//export the weather module 
module.exports = weather;