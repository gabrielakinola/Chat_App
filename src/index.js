const app = require("./app");
const http = require("http");
const Filter = require("bad-words");
const socketio = require("socket.io");

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const { generateMessage, generateLocation } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const io = socketio(server);

let count = 0;

//socket methods
//socke.emit, io.emit, socket.broadcast.emit, socket.join
//io.to.emit, socekt.broadcast.to.emit

io.on("connection", (socket) => {
  console.log("New web socket connection");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("message", generateMessage("Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`));
  });

  socket.on("textMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }
    io.to("South Philly").emit("message", generateMessage(message));
    callback("Message Delivered!");
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMessage",
      generateLocation(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback("Location Shared!");
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} has left`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
