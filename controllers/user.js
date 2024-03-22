const { v4: uuidv4 } = require("uuid");

const userDetails = require("../models/user");
const { setUser } = require("../services/auth");
const cookieParser = require("cookie-parser");

const handleSingUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  const alreadyUser = await userDetails.findOne({ email });
  if (alreadyUser) {
    return res.json({ msg: "already a user with email." });
  }
  const user = await userDetails.create({
    username,
    email,
    password,
  });
  return res.redirect("/login");
};
const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userDetails.findOne({ email, password });
  if (!user) {
    return res.redirect("/login");
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};

module.exports = {
  handleSingUpUser,
  handleLoginUser,
};
