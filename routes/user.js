var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");

//요청받은 유저정보 보내기
router.get("/user", async (req, res) => {
  try {
    console.log(req.body);
    const userId = await Token.findOne({
      where: { accessToken: req.body.accessToken },
    });

    if (userId) {
      const user = await User.findOne({ where: { id: userId.user_id } });
      return res.send(user);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
