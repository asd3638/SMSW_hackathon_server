var express = require("express");
var router = express.Router();
var sequelize = require("sequelize");
const { Coupon, Symbol, Store, User } = require("../models");

// get all store & coupon count with user_id
router.get("/:user_id", async (req, res) => {
  var JSONArray = new Array();
  const user_id = req.params.user_id;
  const stores = await Store.findAll({});

  const count = await Coupon.count({
    where: { user_id: user_id },
    group: ["store_id"],
  });

  const data = { store: stores, count: count };
  res.send(data);
});

// 심볼 별 가게 검색
router.get("/symbol/type=:type", async (req, res) => {
  try {
    const type = req.params.type;
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
