var express = require('express');
var portFinder = require("find-free-port");
var ipAddress = require("ip");
var childProc = require('child_process');

var app = express();

// CORS
app.use(function (req, res, next) {  
  res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow  
  res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time'); // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Credentials', true); // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)

  next();
});

app.use(express.static('application'));
app.use('/game', express.static('game'));

var address = "";

// Find an avaliable port
portFinder(8000, 8100, StartApplication);

// Start the application
function StartApplication(err, freePort){
  console.log('\x1b[32m'); // Switch to green
  console.log(
`
**********************************************
*       Table Realms Embedded Debugger       *
**********************************************
`);
  console.log('\x1b[0m'); // Switch back to white

  // Starts listening on a free port
  app.listen(freePort);

  // Prints the address
  address = 'http://' + ipAddress.address() + ':' + freePort;
  console.log ('App running at >> ' + address);

  // Opens chrome at the address
  childProc.exec('start chrome "' + address +'"', LogChrome);
}

function LogChrome () {
  console.log("Chrome opened.");
}

// Endpoint to get the address of the game
app.get('/getIP', function (req, res) {

  var payload = {
    address : address + "/game"
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(payload));

});