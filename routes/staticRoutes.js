const expess = require("express");
const Url = require("../models/url");
const { strictTo, checkAuth } = require("../middlewares/auth");

const router = expess.Router();

router.get("/", strictTo(["ADMIN"]), async (req, res) => {
  const allurls = await Url.find({});
  return res.render("url", {
    urls: allurls,
  });
});

router.route("/signup").get((req, res) => {
  return res.render("signup");
});
router.route("/login").get((req, res) => {
  return res.render("login");
});

module.exports = router;
