var express = require("express");
var router = express.Router();
const { User, Token }  = require("../models");

//요청받은 유저정보 보내기
router.get("/:token", async (req, res) => {
  const accessToken = req.params.token;
  try {
    const userId = await Token.findOne({
      where: { accessToken },
    });
    if (userId) {
      const user = await User.findOne({ where: { id: userId.user_id } });
      console.log(user);
      return res.send(user);
    }
  } catch (error) {
    console.error(error);
  }
});


// logout
router.get("/logout/:token", async (req, res) => {
  const accessToken = req.params.token;
  try {
    await Token.destroy({ where: { accessToken: accessToken } });
    res.send("logout");
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
