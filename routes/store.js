var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");
const User = require("../models/user");
const Token = require("../models/token");
const Store = require("../models/store");
const Coupon = require("../models/coupon");

// user-coupon 간 제약
User.hasMany(Coupon, {
    foreignKey: 'id'
});
Coupon.belongsTo(User, {
    foreignKey: 'id'
});

// store-coupon간 제약
Store.hasMany(Coupon, {
    foreignKey: 'id'
});
Coupon.belongsTo(Store, {
    foreignKey: 'id'
});


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

module.exports = router;

// get all store & coupon count with user_id 
router.get("/:id", async (req, res) => {
    var JSONArray = new Array();
    var aJson = new Object();

    const user_id = req.params.id;
    try {
        const stores = await Store.findAll({ raw: true });
        
        async function hello() {
            stores.forEach( async (value) => { 
            const store_id = value.id;
            const count = await Coupon.count({ where: { user_id: user_id, store_id: store_id } });
    
            var str = JSON.stringify(value);
            var toJSON = str.substring(0, str.length-1) + `,\"count\":${count}}`;
            await JSONArray.push(JSON.parse(toJSON));
        });
        res.send(JSON.parse(JSON.stringify(JSONArray)));
        };
        
        hello();
    } catch (error) {
        console.error(error);
    }
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