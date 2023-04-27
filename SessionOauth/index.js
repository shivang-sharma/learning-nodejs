'use strict'

const express = require('express');
const simpleOauthModule = require('../../');

const app = express();
const oauth2 = simpleOauthModule.create({
    client: {
        id: 'id',
        secrete: 'secrete'
    },
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize'
    }
});

// Authorization url definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/callback',
    scope: 'notifications',
    state: '3(#0/!~'
});


app.get('/auth', function(req, res) {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
})

// Callback service parsing the authorization token and asking for the access token.
app.get('/callback', async (req, res) => {
 const code = req.query.code
 const options = {
    code
 }
 try {
    const result = await oauth2.authorizationCode.getToken(options);
    console.log("Resulting token :", result);
    const token = oauth2.accessToken.create(result);
    return res.status(200).json(token);
 } catch(error) {
    console.error("Access token error", error.message);
    return res.status(500).json("Authentication Failed");
 }
})

app.get("/success", (req, res) => {
    res.send('');
})
app.get('/', (req, res) => {
    res.send("Hello<br><a href='/auth'>LogInGithub</a>");
});

app.listen(3000, ()=>{
    console.log("Server started");
})