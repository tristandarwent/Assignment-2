
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);

var coordinates = {
  'mercury' : [],
  'venus' : [],
  'earth' : [],
  'mars' : [],
  'jupiter' : [],
  'saturn' : [],
  'uranus' : [],
  'neptune' : []
};

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket Connection
io.on('connection', function(socket){
  
  console.log('A User Connected');

  io.emit('update', 'mercury', coordinates.mercury[0], coordinates.mercury[1]);
  io.emit('update', 'venus', coordinates.venus[0], coordinates.venus[1]);
  io.emit('update', 'earth', coordinates.earth[0], coordinates.earth[1]);
  io.emit('update', 'mars', coordinates.mars[0], coordinates.mars[1]);
  io.emit('update', 'jupiter', coordinates.jupiter[0], coordinates.jupiter[1]);
  io.emit('update', 'saturn', coordinates.saturn[0], coordinates.saturn[1]);
  io.emit('update', 'uranus', coordinates.uranus[0], coordinates.uranus[1]);
  io.emit('update', 'neptune', coordinates.neptune[0], coordinates.neptune[1]);

  socket.on('moveShape', function(id, x, y){
    console.log(id + ' ' + x + ' ' + y)
    io.emit('update', id, x, y);
    coordinates[id][0] = x;
    coordinates[id][1] = y;
    console.log(coordinates.earth[0]);
  });
});

// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
