const path = require("path");
const expess = require("express");
const connection = require("./connect");
const { strictToLogedInUser, checkAuth } = require("./middlewares/auth");

// routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = expess();

const PORT = 8001;
connection(
  "mongodb+srv://kumar:vQUgHNTjxNUrTlgv@alpha.9j5kqi2.mongodb.net/?retryWrites=true&w=majority&appName=alpha"
);

// views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(expess.json());
app.use(expess.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/url", urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("listening on PORT:", PORT);
});
