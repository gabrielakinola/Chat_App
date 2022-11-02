const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketio(server);

let count = 0;

const welcomeMsg = "Welcome!";

io.on("connection", (socket) => {
  console.log("New web socket connection");

  //socket.emit("welcomeMessage", welcomeMsg)
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("textMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("sendLocation", (coords) => {
    io.emit(
      "message",
      `Location is https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
