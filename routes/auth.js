var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");

//로그아웃
router.get("/api/users/logout", async (req, res) => {
  req.logout(); //passport의 logout

  //토큰 테이블의 토큰 삭제
  await Token.destroy({ where: { user_id: req.body.id } });
  //console.log("token deleted")
  res.redirect("/");
});

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
    console.log("###################################################");
    const token = {
      accessToken: req.authInfo.dataValues.accessToken,
      email: req.authInfo.dataValues.email,
    };
    res.redirect(`http://localhost:3000?accessToken=${token.accessToken}`);
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
    const token = {
      accessToken: req.authInfo.dataValues.accessToken,
      email: req.authInfo.dataValues.email,
    };
    res.redirect(`http://localhost:3000?accessToken=${token.accessToken}`);
  }
);

module.exports = router;
