var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost');
	next();
});
app.get('/', function(req, res){
  //res.sendfile('index.html');
});

//io.on('connection', function(socket){
//  console.log('a user connected');
//});
io.on('connection', function(socket){
  console.log('connection');
  socket.on('sendMessage', function(message){
    console.log(JSON.stringify(message));
    socket
      //.broadcast
      .emit('receivedMessage', message);
  })
  socket.on('event', function(data){ console.log('event')});
  socket.on('disconnect', function(){});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});