const express = require('express');
const { Coupon, Store, Symbol } = require('../models');

const router = express.Router();

//지도에서 가게 마커 눌렀을 때 가게심볼 + 갖고 있는 쿠폰 출력
router.get('/:user_id/:store_id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findAll(
      { where: { user_id: req.params.user_id, store_id: req.params.store_id },
        order: [['end_date', 'ASC']]
      });
    const symbol = await Symbol.findAll( { where: { store_id : req.params.store_id } })
    
      if(coupon){
          var data = {coupon: coupon, symbol: symbol}
          res.send(data)
      }
      else {
          res.send(symbol)
      }
    
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;