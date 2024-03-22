const expess = require("express");
const Url = require("../models/url");

const router = expess.Router();

router.get("/", (req, res) => {
  Url.find({}).then((result) => {
    return res.render("url", {
      urls: result,
    });
  });
});

router.route("/signup").get((req, res) => {
  return res.render("signup");
});
router.route("/login").get((req, res) => {
  return res.render("login");
});

module.exports = router;
