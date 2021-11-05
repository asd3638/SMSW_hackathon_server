var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");

/*
 * GOOGLE LOGIN
 */

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    const token = {
      accessToken: req.authInfo.dataValues.accessToken,
      email: req.authInfo.dataValues.email,
    };
    res.redirect(
      `http://localhost:3000/login?accessToken=${token.accessToken}`
    );
  }
);

/*
 * KAKAO LOGIN
 */

// /auth/kakao로 인증 요청보내면 passport.js로 가
router.get("/kakao", passport.authenticate("kakao-login"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao-login", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    console.log(req);
    const token = {
      accessToken: req.authInfo.dataValues.accessToken,
      email: req.authInfo.dataValues.email,
    };
    res.redirect(
      `http://localhost:3000/login?accessToken=${token.accessToken}`
    );
  }
);

module.exports = router;
