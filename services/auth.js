// const uuidToUserMap = new Map();

// const setUser = (id, user) => {
//   uuidToUserMap.set(id, user);
// };
// const getUser = (id) => {
//   return uuidToUserMap.get(id);
// };

const jwt = require("jsonwebtoken");
const key = "it's&key";

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    key
  );
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
