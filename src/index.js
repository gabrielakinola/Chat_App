const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketio(server);

let count = 0;

io.on("connection", (socket) => {
  console.log("New web socket connection");

  socket.emit("countUpdated", count);
  socket.on("increment", () => {
    count++;
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
