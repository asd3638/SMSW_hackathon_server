const express = require('express');
const { Coupon, Store } = require('../models');

const router = express.Router();

//지도에서 가게 마커 눌렀을 때 가게정보 + 갖고 있는 쿠폰 출력
router.get('/:user_id/:store_id', async (req, res, next) => {
  try {
    const store = await Store.findOne( {where: { id: req.params.store_id }})
    const coupon = await Coupon.findAll({ where: { user_id: req.params.user_id, store_id: req.params.store_id } });
    if (store) {
        if(coupon){
            var data = {store: store, coupon: coupon}
            res.send(data)
        }
        else {
            res.send(store)
        }
    } else {
      res.status(400).send('no store');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;