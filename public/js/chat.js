const socket = io();

document.querySelector("#sendMsg").addEventListener("click", (e) => {
  e.preventDefault();
  const message = document.querySelector("#message").value;

  //console.log(message);
  socket.emit("textMessage", message);
});

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});

socket.on("location", (coordinates) => {
  console.log(coordinates);
  console.log(
    `latitude is ${coordinates.latitude} and longitude is ${coordinates.longitude}`
  );
});
