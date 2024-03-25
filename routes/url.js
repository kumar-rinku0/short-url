const expess = require("express");
const {
  handleCreateNewURL,
  handleGetURLVisits,
  handleGetAllURLVisites,
  handleGetURLVisites,
} = require("../controllers/url");
const { strictTo, checkAuth } = require("../middlewares/auth");

const router = expess.Router();

router.get("/info", strictTo(["NORMAL"]), handleGetAllURLVisites);
router
  .route("/")
  .get(strictTo(["NORMAL"]), handleGetURLVisites)
  .post(strictTo(["NORMAL"]), handleCreateNewURL);
router.get("/:shortId", handleGetURLVisits);

module.exports = router;
