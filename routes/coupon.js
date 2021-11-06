const express = require('express');
const router = express.Router();
const { Coupon, Symbol } = require('../models');


//사용자 쿠폰 정보 넘겨주기(MyPage용)
router.get('/:id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findAll(
      { where: { user_id: req.params.id },
        order: [['end_date', 'ASC']]
      });
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

/*
 * ㄷ ㅏ오나...

     여기 수정해  . .  .. .  * 
 
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
*/

//지도에서 가게 마커 눌렀을 때 가게의 심볼 + 갖고 있는 쿠폰 출력
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

// coupon destroy
router.delete('/:coupon_id', async(req, res) => {
  try {
      const coupon_id = req.params.coupon_id;
      await Coupon.destroy({where: {id: coupon_id}})
      .then(result => {
          res.status(200).send("SUCCESS");
       })
       .catch(err => {
          console.error(err);
       });
  } catch(err) {
      console.log(err);
  }
})

module.exports = router;