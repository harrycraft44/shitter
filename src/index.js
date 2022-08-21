//express 
//define fs
const fs = require('fs'); 
const express = require('express');
const app = express();
const port = process.env.PORT || 81;
const bodyParser = require('body-parser');
// html server without monogoose
const http = require('http');
const ports = 80;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    switch (req.url){
        case "/":
            res.end(fs.readFileSync(`${__dirname}/html/index.html`, "utf8"));
            break;
        
    }

});
//simple get api
app.get('/api/get', (req, res) => {
    res.send({
        message: 'Hello World'
    });
} );

app.listen(port);
server.listen(ports);