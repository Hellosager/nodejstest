const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const hostname = '127.0.0.1';


const port = process.env.PORT || 3000;

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', socket => {
  console.log("User connected");
  socket.on('disconnect', () => {
    console.log("User disconnected");
  });

  socket.on('mousemove', (point) => {
    // console.log("Following point was sent: " + point.x + ":" + point.y);
    socket.broadcast.emit('mouseMove', point);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

