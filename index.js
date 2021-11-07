const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { sequelize } = require("./models");
const cors = require("cors");

const app = express();

app.use(
  session({ secret: "MySecret", resave: false, saveUninitialized: true })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(
      "===================== Database Connected ========================"
    );
  })
  .catch((err) => {
    console.error(err);
  });

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));``
app.use("/api/coupon", require("./routes/coupon"));
app.use("/api/store", require("./routes/store"));
app.use("/api/symbol", require("./routes/symbol"));

// Port setting
var port = 8080;
app.listen(port, function () {
  console.log(
    "================= Server started on port " + port + " ==================="
  );
});
