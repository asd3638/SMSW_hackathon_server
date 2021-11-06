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

router.route("/edit/:id")
  .patch(async (req, res) => {
  const user_id = req.params.id;
  const student_id = req.body.student_id;
  const major = req.body.major;

  try {
    await User.update({
      student_id: student_id,
      major: major
    }, { where: {id: user_id}});
    res.send("updated successfully");
  } catch(error) {
    console.error(error);
  }
  
})


module.exports = router;
