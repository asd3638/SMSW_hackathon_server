var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: 'http://localhost:3000/login'
    }), function(req, res) {
        res.send(token = {
            accessToken: req.authInfo.dataValues.accessToken,
            email: req.authInfo.dataValues.email,
        })
        res.redirect("http://localhost:3000/")
    });

module.exports = router;
