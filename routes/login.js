const express = require("express");
const router = express.Router();
const { Login } = require("../models");
const sequelize = require("sequelize");

router.post("/", function (req, res, next) {
  let body = req.body;

  Login.create({
    username: body.username,
    password: body.password,
  })
    .then((result) => {
      res.send("post 요청 성공");
    })
    .catch((err) => {
      console.log(err);
      res.send("post 요청 실패");
    });
});

module.exports = router;
