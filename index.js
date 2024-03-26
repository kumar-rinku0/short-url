require("dotenv").config();

const path = require("path");
const expess = require("express");
const connection = require("./connect");
const { strictTo, checkAuth } = require("./middlewares/auth");

// routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = expess();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connection(MONGO_URI);

// views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(expess.json());
app.use(expess.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);

// routes
app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("listening on PORT:", PORT);
});
