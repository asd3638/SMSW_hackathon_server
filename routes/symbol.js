const { response } = require("express");
const sequelize = require('sequelize');
var express = require("express");
var router = express.Router();
const { Symbol, Store } = require('../models');

//모든 심볼 타입 출력
router.get('/', async(req,res) => {
    try {
        const symbol = await Symbol.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('symbol_type')), 'symbol_type']],
        });
        res.status(200).send(symbol);
    } catch(err) {
        console.log(err);
    }
    
})

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

