const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//app.set("view engine", "ejs");
app.use(
  session({ secret: "MySecret", resave: false, saveUninitialized: true })
);
app.use(cors());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/user"));

// Port setting
var port = 8080;
app.listen(port, function () {
  console.log("server on!" + port);
});
