var express = require("express");
var router = express.Router();
const { Coupon, Symbol, Store, User } = require('../models');


// get all store & coupon count with user_id 
router.get("/:user_id", async (req, res) => {
    var JSONArray = new Array();
    const user_id = req.params.id;
    const stores = await Store.findAll({ raw: true });

    const count = await Coupon.count({
        group: ['store_id']});
    res.send(count);
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

