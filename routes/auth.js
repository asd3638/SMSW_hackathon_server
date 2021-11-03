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


/*
 * KAKAO LOGIN  
 */

// /auth/kakao로 인증 요청보내면 passport.js로 가
router.get('/kakao', passport.authenticate('kakao-login'));
router.get('/kakao/callback', passport.authenticate('kakao-login', {
    failureRedirect: 'http://ec2-18-218-203-237.us-east-2.compute.amazonaws.com:3000/login',
  }), function(req, res) {
      const token = {
        accessToken: req.authInfo.dataValues.accessToken,
        email: req.authInfo.dataValues.email
      }
      res.redirect(`http://ec2-18-218-203-237.us-east-2.compute.amazonaws.com:3000?accessToken=${token.accessToken}&email=${token.email}`);
});


module.exports = router;
