//defineexpress 
// fs
const fs = require('fs'); 
const express = require('express');
const app = express();
const port = process.env.PORT || 81;
const bodyParser = require('body-parser');
// html server without monogoose
const http = require('http');
const { application } = require('express');
const ports = 80;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // in the swith statement we are checking the path of the request and then we are sending the correct html file
    switch (req.url){
        case "/":
            res.end(fs.readFileSync(`${__dirname}/html/index.html`, "utf8"));
            break;
        case "/login":
            res.end(fs.readFileSync(`${__dirname}/html/login.html`, "utf8"));
            break;
        case "/register":
            res.end(fs.readFileSync(`${__dirname}/html/register.html`, "utf8"));
            break;
        default:
            res.end(fs.readFileSync(`${__dirname}/html/404.html`, "utf8"));
            break;
        
    }

});

app.get('/api/get', (req, res) => {
    res.send({
        message: 'Hello World'
    });
} );
//simple post api
app.post('/api/login', (req, res) => {
    // get json file and check if username and password are correct
    const user = require('./data/user.json');
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        res.send({
            message: 'Login Successful'
        });
    }
    else {
        res.send({
            message: 'Login Failed'
        });
    }

} );
app.post('/api/register', (req, res) => {
    var users = fs.readFileSync(__dirname + '\\users.txt', "utf8");
    users = users + "<br>" + req.body.name + ":" + req.body.password
    fs.writeFile(__dirname + '\\users.txt', users, err => {
      if (err) {
        console.error(err)
        return
      }
      //create folder 
      fs.mkdir(__dirname + '\\user\\' + req.body.name+"\\", { recursive: true }, (err) => {
        if (err) {
          console.error(err)
          return
        }  
        fs.writeFile(`${__dirname}\\user\\${req.body.name}\\subs.txt`, "0", err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })
      }
        ) 
  //write a file 
      res.redirect(307, `http://${ip}/login`);
      res.end()
    })
  });

//this simply tells the server to listen on port 80 and then logs the message to the console
console.log("Server listening on port 80");
app.listen(port);
server.listen(ports);