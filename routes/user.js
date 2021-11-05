var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");

//요청받은 유저정보 보내기
router.get("/user/:token", async (req, res) => {
  const accessToken = req.params.token;
  try {
    const userId = await Token.findOne({
      where: { accessToken },
    });

    if (userId) {
      console.log(userId);
      const user = await User.findOne({ where: { id: userId.user_id } });
      console.log(user);
      return res.send(user);
    }
  } catch (error) {
    console.error(error);
  }
});


//로그아웃
router.get("/user/logout/:token", async (req, res) => {
  const accessToken = req.params.token;
  try {
    await Token.destroy({ where: { accessToken: accessToken } });
    res.send("logout");
  } catch (error) {
    console.error(error);
  }
  
});


module.exports = router;
