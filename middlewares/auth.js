const { getUser } = require("../services/auth");

const strictToLogedInUser = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect("/login");
  }
  const user = getUser(token);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  const tokenCookie = req?.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const user = getUser(tokenCookie);
  req.user = user;
  next();
};

module.exports = {
  strictToLogedInUser,
  checkAuth,
};
