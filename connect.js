const mongoose = require("mongoose");
// const { deletmany } = require("./controllers/url");

const connection = (uri) => {
  console.log("Trying to Connect with database!!");
  mongoose
    .connect(uri)
    .then((response) => {
      console.log("connected to database!!");
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;
