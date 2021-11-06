var express = require("express");
var router = express.Router();
var sequelize = require("sequelize");

const { Coupon, Symbol, Store, User } = require('../models');

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
    const user_id = req.params.user_id;
    const stores = await Store.findAll({ 
    });

    const count = await Coupon.count({
        where: {user_id:user_id},
        group: ['store_id'],
    });

    const data = {store: stores, count: count};
    res.send(data);
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
[
    {
        "store_id": 3,
        "count": 1
    },
    {
        "store_id": 4,
        "count": 2
    },
    {
        "store_id": 5,
        "count": 1
    }
]