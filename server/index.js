var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 }, function(){
  	console.log("wss start");
  });

var control = [];
var view = [];

wss.on('connection', function connection(ws) {
  console.log(ws.url + " comes in")
  ws.on('message', function incoming(message) {
  	console.log('receive: ' + message)
    ws.send(message);
    console.log('send: ' + message)
  });
});

