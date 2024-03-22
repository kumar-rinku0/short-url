const expess = require("express");
const router = expess.Router();
const { handleSingUpUser, handleLoginUser } = require("../controllers/user");

router.post("/signup", handleSingUpUser);
router.post("/login", handleLoginUser);

module.exports = router;
