// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);

// Holds planet positions on server so they are the same for every user
var coordinates = {
  'theSun' : [],
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
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket Connection
io.on('connection', function(socket) {
  
  console.log('A User Connected');

  // Sets positions of planets to newly connected users with coordinates stored in array in server, also hiding the label for each
  io.emit('movePlanet', 'theSun', coordinates.theSun[0], coordinates.theSun[1]);
  io.emit('removePlanet', 'theSun');
  io.emit('movePlanet', 'mercury', coordinates.mercury[0], coordinates.mercury[1]);
  io.emit('removePlanet', 'mercury');
  io.emit('movePlanet', 'venus', coordinates.venus[0], coordinates.venus[1]);
  io.emit('removePlanet', 'venus');
  io.emit('movePlanet', 'earth', coordinates.earth[0], coordinates.earth[1]);
  io.emit('removePlanet', 'earth');
  io.emit('movePlanet', 'mars', coordinates.mars[0], coordinates.mars[1]);
  io.emit('removePlanet', 'mars');
  io.emit('movePlanet', 'jupiter', coordinates.jupiter[0], coordinates.jupiter[1]);
  io.emit('removePlanet', 'jupiter');
  io.emit('movePlanet', 'saturn', coordinates.saturn[0], coordinates.saturn[1]);
  io.emit('removePlanet', 'saturn');
  io.emit('movePlanet', 'uranus', coordinates.uranus[0], coordinates.uranus[1]);
  io.emit('removePlanet', 'uranus');
  io.emit('movePlanet', 'neptune', coordinates.neptune[0], coordinates.neptune[1]);
  io.emit('removePlanet', 'neptune');

  // Sends planet position changes main.js
  socket.on('move', function(id, x, y) {
    io.emit('movePlanet', id, x, y);
    coordinates[id][0] = x;
    coordinates[id][1] = y;
  });

  // Sends planet id to hide label and reset z-index to main.js
  socket.on('remove', function(id) {
    io.emit('removePlanet', id);
  });
});

// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function() {
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
