var Client = require('node-rest-client').Client
var client = new Client();

var args = {
	data: { 
        email: "sample@email.com",
        username: "tesuser",
        password:"testing@123",
        firstname:"test",
        lastname: "user",
        city: "city",
        street: "surrey",
        number: 1120,
        zipcode: 201080,
        lat: "22.9",
        long: "213.02",
        phone:"912030593"
    },
	headers: { "Content-Type": "application/json" }
};

// client.post('http://localhost:5000/api/v1/user/', args, (data, res) => {
//     // parsed res body as js object
//     console.log(data);
//     // raw response
//     console.log(res.body);
// });

var putArgs = {
    data: { 
        email: "shivang@email.com",
        username: "tesuser",
        password:"testing@123",
        firstname:"test",
        lastname: "user",
        city: "calgary",
        street: "surrey",
        number: 1120,
        zipcode: 201080,
        lat: "22.9",
        long: "213.02",
        phone:"912030593"
    },
    headers: { "Content-Type": "application/json" }
};
client.put('http://localhost:5000/api/v1/user/1/', putArgs, (data, res) => {
    // parsed res body as js object
    console.log(data);
    // raw response
    console.log(res.body);
});