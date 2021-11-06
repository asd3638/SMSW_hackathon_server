const express = require('express');
const { Symbol } = require('../models');

const router = express.Router();


//위드숙명 심볼 클릭 시 그 심볼해당 가게 출력
router.get('/:id', async (req, res, next) => {
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