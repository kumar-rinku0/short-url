const { getUser } = require("../services/auth");

function checkAuth(req, res, next) {
  const tokenCookie = req.cookies?.token;
  if (!tokenCookie) {
    return next();
  }
  const user = getUser(tokenCookie);
  req.user = user;
  next();
}

function strictTo(role = ["ADMIN", "NORMAL"]) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!role.includes(req.user.role)) {
      return res.end("unauthorised!!");
    }
    next();
  };
}

module.exports = {
  checkAuth,
  strictTo,
};
