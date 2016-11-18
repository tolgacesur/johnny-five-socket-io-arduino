var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require('johnny-five');
var path = require('path');
var button, led, msg;
var board = new five.Board();


app.get('/', function (req,res) {
  res.sendfile('index.html');
});


board.on('ready', function () {
  led= new five.Led(13);
  button= new five.Button({
    pin:7,
    isPullup: true
  });

io.on('connection', function(socket){
 console.log("bir kullanıcı girdi");

button.on("down",function (value) {
  led.on();
  msg = "YANDI";
  console.log('mesaj: ' + msg);

     io.emit('tetik', msg);

  });

 button.on("up", function () {
   led.off();
     msg= "SÖNDÜ";
     console.log('mesaj: '+ msg);
     io.emit('tetik', msg);
   });

  socket.on('disconnect', function () {
    console.log('ayrıldı');
  });

});
});

http.listen(5000, function(){
  console.log("port : 3000");
});
