const express = require('express');
const { Coupon } = require('../models');

const router = express.Router();


//사용자 쿠폰 정보 넘겨주기
router.get('/coupon/:id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findAll({ where: { user_id: req.params.id } });
    if (coupon) {
      res.status(200).send(coupon);
    } else {
      res.status(400).send('no coupon');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;