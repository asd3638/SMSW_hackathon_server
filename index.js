var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
const { sequelize } = require("./models");

app.set("view engine", "ejs");
app.use(
  session({ secret: "MySecret", resave: false, saveUninitialized: true })
);

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

// Routes
app.use("/", require("./routes/main"));
app.use("/auth", require("./routes/auth"));

// Port setting
var port = 8080;
app.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});
