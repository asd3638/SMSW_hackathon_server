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
      const stores = await Store.findAll({raw: true});
      if(stores) {
        res.status(200).send(stores);
      } else {
        res.status(400).send("NO STORES");
      }
      
    } catch (error) {
      console.error(error);
      res.send(error)
    }
  });

  module.exports = router;