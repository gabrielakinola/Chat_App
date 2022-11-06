const socket = io();

//Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $locationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

const messageTemplate = document.querySelector("#message-template").innerHTML;

const locationTemplate = document.querySelector("#location-template").innerHTML;

const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

let { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
username = username.toLowerCase();
room = room.toLowerCase();
console.log(username, room);
// const autoscroll = () => {
//   //New message element
//   const $newMessage = $messages.lastElementChild;
//Uncomment this later

//   //Height of the new message
//   const newMessageStyles = getComputedStyle($newMessage);
//   const newMessageMargin = parseInt(newMessageStyles.marginBottom);
//   const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;
// };

// //Visible height
// const visibleHeight = $messages.offsetHeight;

// //Height of messages container
// const containerHeight = $messages.scrollHeight;

// //How far have I scrolled?
// const scrollOffset = $messages.scrollTop + visibleHeight;

// if (containerHeight - newMessageHeight <= scrollOffset) {
//   $messages.scrollTop = $messages.scrollHeight;
// }
socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  //autoscroll();
});

socket.on("locationMessage", (url) => {
  const html = Mustache.render(locationTemplate, {
    username: url.username,
    url: url.location,
    createdAt: moment(url.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  //autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, { room, users });
  document.querySelector("#sidebar").innerHTML = html;
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = document.querySelector("#message").value;

  //console.log(message);
  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("Message delivered");
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  $locationButton.setAttribute("disabled", "disabled");
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (message) => {
        $locationButton.removeAttribute("disabled");
        console.log(message);
      }
    );
  });
});

socket.on("location", (coordinates) => {
  console.log(coordinates);
  console.log(
    `latitude is ${coordinates.latitude} and longitude is ${coordinates.longitude}`
  );
});

socket.emit("join", { username, room }, (error) => {
  alert(error);
  location.href = "/";
});
