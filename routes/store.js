var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");
const Store = require("../models/store");
const Coupon = require("../models/coupon");

// get all store
router.get("/", async (req, res) => {
    try {
        const stores = await Store.findAll({ raw: true });
        if (stores) {
            res.status(200).json(stores);
        } else {
            res.status(400).send("NO STORE");
        }

    } catch (error) {
        console.error(error);
        res.send(error);
    }
});


// get all store & coupon count with user_id  이거!
//주는 id는 유저 id
router.get("/:id", async (req, res) => {
    var JSONArray = new Array();
    const user_id = req.params.id;
    const stores = await Store.findAll();
    var i = 0
    for (const store of stores) {

        const store_id = i;
        const count = await Coupon.count({ where: { user_id: user_id, store_id: store_id } });
        var str = JSON.stringify(i);
        var toJSON = str.substring(0, str.length-1) + `,\"count\":${count}}`;

        JSONArray.push(JSON.parse(toJSON));
        i++
        //console.log(JSONArray);
    }

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

module.exports = router;