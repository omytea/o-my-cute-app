var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 }, function(){
  	console.log("wss start");
  });

wss.on('connection', function connection(ws) {
  console.log(ws.url + " comes in")
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('message');
});

