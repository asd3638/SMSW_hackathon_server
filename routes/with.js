const express = require('express');
const { Symbol } = require('../models');

const router = express.Router();

//위드숙명 심볼 클릭 시 그 심볼해당 가게 출력
//req 확실X 나중에
router.get('/:id', async (req, res, next) => {
  try {
    const symbol = await Symbol.findAll({ where: { user_id: req.params.id } });
    if (symbol) {
      res.status(200).send(symbol);
    } else {
      res.status(400).send('no symbol');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;