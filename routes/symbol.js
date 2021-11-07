var express = require("express");
var router = express.Router();
const { Symbol, Store } = require('../models');

// 심볼 별 가게 검색
router.post('/', async(req, res) => {
    try {
        const type = req.body.symbol_type;
        const stores = await Symbol.findAll({where: {symbol_type: type}});
        res.status(200).send(stores);
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;

