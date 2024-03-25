const Url = require("../models/url");
const shortid = require("shortid");

// post request of handle create new user!!
const handleCreateNewURL = (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ msg: "url required...!!" });
  }
  Url.create({
    shortId: shortid.generate(),
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  })
    .then((result) => {
      return res.status(200).json({ msg: "success", result: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get request of get a user info using id!!
const handleGetURLVisits = (req, res) => {
  const shortId = req.params?.shortId;
  if (shortId.length < 8 || shortId.length > 10) {
    return res.json({ msg: "invalid url" });
  }
  Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  )
    .then((result) => {
      return res.redirect(result.redirectURL);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get request of get a user info using id!!
const handleGetAllURLVisites = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  Url.find({ createdBy: req.user._id })
    .then((result) => {
      return res.render("url", {
        urls: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleGetURLVisites = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  Url.find({ createdBy: req.user._id })
    .then((result) => {
      return res.render("url", {
        urls: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletmany = () => {
  Url.deleteMany()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  handleCreateNewURL,
  handleGetURLVisits,
  handleGetAllURLVisites,
  deletmany,
  handleGetURLVisites,
};
