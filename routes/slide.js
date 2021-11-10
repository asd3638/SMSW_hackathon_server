const express = require("express");
const router = express.Router();
const { Slide } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const slide = await Slide.findAll();
    res.status(200).send(slide);
  } catch (error) {}
});

module.exports = router;
