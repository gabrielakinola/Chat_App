const generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocation = (location) => {
  return { location, createdAt: new Date().getTime };
};
module.exports = { generateMessage, generateLocation };
