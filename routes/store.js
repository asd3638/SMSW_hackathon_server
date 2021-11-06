var express = require("express");
var router = express.Router();
const { Coupon, Symbol, Store } = require('../models');

// get all store
router.get("/", async (req, res) => {
    try {
        const stores = await Store.findAll({ raw: true });
        if (stores) {
            res.status(200).json(stores);
        } else {
            res.status(400).send("NO STORES");
        }
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});


// get all store & coupon count with user_id 
router.get("/:user_id", async (req, res) => {
    var JSONArray = new Array();
    const user_id = req.params.id;
    const stores = await Store.findAll({ raw: true });
    var i = 0;

    stores.forEach(async(value) => {
    
        const store_id = value.id;
        const count = await Coupon.count({ where: { user_id: user_id, store_id: store_id } });

        var str = JSON.stringify(value);
        var toJSON = str.substring(0, str.length-1) + `,\"count\":${count}}`;

        JSONArray.push(JSON.parse(toJSON));
        console.log(i + "번째 반복 중");
        i++
        console.log(JSONArray);
    })
    
    res.send((JSONArray));
});

// 심볼 별 가게 검색
router.get('/symbol/type=:type', async(req, res) => {
    try {
        const type = req.params.type;
        
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;

