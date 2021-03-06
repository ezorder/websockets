var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
	res.header('Access-Control-Allow-Origin', 'https://sheltered-badlands-2237.herokuapp.com');
	next();
});
app.get('/', function(req, res){
  //res.sendfile('index.html');
});
var port = process.env.PORT || 3000
//io.on('connection', function(socket){
//  console.log('a user connected');
//});
io.on('connection', function(socket){
  console.log('connection');
  socket.on('customerOrdered', function(message){
    console.log(message);
    socket.broadcast.emit('orderPlaced', message);
  });
  socket.on('sendMessage', function(message){
    console.log(JSON.stringify(message));
    socket
      //.broadcast
      .emit('receivedMessage', message);
  })
  socket.on('event', function(data){ console.log('event')});
  socket.on('disconnect', function(){});
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});