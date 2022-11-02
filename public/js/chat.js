const socket = io();

document.querySelector("#sendMsg").addEventListener("click", (e) => {
  e.preventDefault();
  const message = document.querySelector("#message").value;

  //console.log(message);
  socket.emit("textMessage", message);
});

socket.on("text", (msg) => {
  console.log(msg);
});
