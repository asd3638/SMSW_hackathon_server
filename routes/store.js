var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");
const Store = require("../models/store");
const Coupon = require("../models/coupon");
const Symbol = require("../models/symbol");

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
router.get("/:id", async (req, res) => {
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


router.get('/delete/:coupon_id', async(req, res) => {
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

// 심볼 별 가게 검색
router.get('/symbol/type=:type', async(req, res) => {
    try {
        const type = req.params.type;
        
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;

