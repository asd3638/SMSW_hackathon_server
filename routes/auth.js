var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");

/*
 * GOOGLE LOGIN
 */

function CheckEmail(str) {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@sookmyung.ac.kr/;
  if (reg_email.test(str)) {
    return true;
  }
  else {
    return false;
  }
}

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    const token = {
      accessToken: req.authInfo.dataValues.accessToken,
      email: req.authInfo.dataValues.email,
    };

    if(CheckEmail(req.authInfo.dataValues.email)){
      res.redirect(`http://localhost:3000/login?accessToken=${token.accessToken}`);
    } else {
      res.redirect('http://localhost:3000/login?LoginFail');
    }
    
  }
);

module.exports = router;
