const express = require("express");
const router = express.Router();
const { Coupon, Symbol, Store } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

//사용가능한 쿠폰
router.get("/:id/available", async (req, res, next) => {
  try {
    const coupon = await Coupon.findAll({
      where: { user_id: req.params.id },
      order: [["end_date", "ASC"]],
    });
    var st_name = [];
    for (var i = 0; i < coupon.length; i++) {
      var st_id = coupon[i].store_id;

      if (typeof st_id !== "undefined") {
        const store = await Store.findOne({ where: { id: st_id } });
        st_name.push(store.name);
      }
    }
    var data = { coupon: coupon, store_name: st_name };

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send("no data");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//만료쿠폰
router.get("/:id/expired", async (req, res, next) => {
  try {
    const coupon = await Coupon.findAll({
      where: { user_id: req.params.id, ifDeleted: true },
      paranoid: false,
      order: [["end_date", "ASC"]],
    });
    var st_name = [];
    for (var i = 0; i < coupon.length; i++) {
      var st_id = coupon[i].store_id;

      if (typeof st_id !== "undefined") {
        const store = await Store.findOne({ where: { id: st_id } });
        st_name.push(store.name);
      }
    }
    var data = { coupon: coupon, store_name: st_name };

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send("no data");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//지도에서 가게 마커 눌렀을 때 가게의 심볼 + 갖고 있는 쿠폰 출력
router.get("/:user_id/:store_id", async (req, res, next) => {
  try {
    const coupon = await Coupon.findAll({
      where: { user_id: req.params.user_id, store_id: req.params.store_id },
      order: [["end_date", "ASC"]],
    });
    const symbol = await Symbol.findAll({
      where: { store_id: req.params.store_id },
    });

    if (coupon) {
      var data = { coupon: coupon, symbol: symbol };
      res.send(data);
    } else {
      res.send(symbol);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// coupon destroy
router.delete("/:coupon_id", async (req, res) => {
  try {
    const coupon_id = req.params.coupon_id;
    await Coupon.update(
      {
        ifDeleted: true,
      },
      { where: { id: coupon_id } }
    );
    await Coupon.destroy({ where: { id: coupon_id } })

      .then((result) => {
        res.status(200).send("SUCCESS");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.log(err);
  }
});

//쿠폰 검색
router.get(`/:searchWord`, async (req, res, next) => {
  const searchWord = decodeURIComponent(req.params.searchWord);

  await Coupon.findAll({
    where: {
      content: {
        [Op.like]: "%" + searchWord + "%",
      },
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
