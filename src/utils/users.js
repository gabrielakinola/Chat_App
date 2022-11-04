const users = [];

//addUser, removeUser, getUser, getUserInRoom

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Validate the data
  if (!username || !room) {
    return {
      error: "Username and name are required",
    };
  }

  //Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //Validate username
  if (existingUser) {
    return {
      error: "Username is in use",
    };
  }

  //Store User
  const user = { id, username, room };
  users.push(user);
  return { user };
};

addUser({
  id: 22,
  username: "Gabby",
  room: "South Philly",
});

addUser({
  id: 25,
  username: "Angela",
  room: "Atlanta",
});

addUser({
  id: 27,
  username: "Bukky",
  room: "New york",
});

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  const user = users.find((user) => {
    return user.id === id;
  });

  if (!user) {
    return { error: `No users with id ${id}` };
  }
  return user;
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();

  const usersInRoom = users.filter((user) => {
    return user.room === room;
  });

  if (!usersInRoom) {
    return { error: "No users in that room" };
  }
  return usersInRoom;
};
module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
