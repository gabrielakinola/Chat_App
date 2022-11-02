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

  socket.on("textMessage", (message) => {
    io.emit("text", message);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
