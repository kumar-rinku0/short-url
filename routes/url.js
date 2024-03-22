const expess = require("express");
const {
  handleCreateNewURL,
  handleGetURLVisits,
  handleGetAllURLVisites,
} = require("../controllers/url");
const { strictToLogedInUser, checkAuth } = require("../middlewares/auth");

const router = expess.Router();

router.get("/info", strictToLogedInUser, handleGetAllURLVisites);
router.post("/", strictToLogedInUser, handleCreateNewURL);
router.get("/:shortId", handleGetURLVisits);

module.exports = router;
