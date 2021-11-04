var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");

router.get("/login", function (req, res) {
  res.render("auth/login");
});

//로그아웃
router.get("/api/users/logout", async (req, res) => {
  req.logout();   //passport의 logout

  //토큰 테이블의 토큰 삭제
  await Token.destroy({where: {user_id : req.body.id }})
  //console.log("token deleted")
  res.redirect("/");
});

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: 'http://ec2-18-218-203-237.us-east-2.compute.amazonaws.com:3000/login'
    }), function(req, res) {
        const token = {
            accessToken: req.authInfo.dataValues.accessToken,
            email: req.authInfo.dataValues.email,
        }
        res.redirect(`http://ec2-18-218-203-237.us-east-2.compute.amazonaws.com:3000?accessToken=${token.accessToken}`)
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
      res.redirect(`http://ec2-18-218-203-237.us-east-2.compute.amazonaws.com:3000?accessToken=${token.accessToken}`);
});


//요청받은 유저정보 보내기
router.get('/api/user', async (req,res) => {
  try {
    console.log(req.body);
    const userId = await Token.findOne({ where: { accessToken: req.body.accessToken}});
    
    if (userId) {
      const user = await User.findOne({ where: { id: userId.user_id} })
      return res.send(user)
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
